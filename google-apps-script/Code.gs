/*
  Master resume -> portfolio API
  1. Open script.google.com while signed into the Google account that owns the resume.
  2. Create a new project, replace Code.gs with this file, and deploy as a Web App.
  3. Execute as: Me. Who has access: Anyone.
  4. Copy the /exec URL into public/portfolio-config.js in this repository and deploy the site once.

  In the Google Doc, use these headings exactly: SUMMARY, SKILLS, CONTACT, LOCATION.
  Use one skill per bullet or put skills on a comma-separated line below SKILLS.
*/
const DOCUMENT_ID = '1MATzyPKk4mo2Y2bF9r6yuZmw_Zte1qX2W0G01o5CpoY'

function doGet() {
  const body = DocumentApp.openById(DOCUMENT_ID).getBody()
  const text = body.getText()
  const sections = splitSections_(text)
  const contact = sections.CONTACT || ''
  const email = contact.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || ''
  const phone = contact.match(/(?:\+91[ -]?)?\d{10}/)?.[0] || ''
  const experience = parseExperience_(sections['WORK EXPERIENCE'])
  const certifications = mergeCertificateLinks_(parseCertificates_(sections.CERTIFICATIONS), certificateLinks_(body))
  const profile = {
    summary: clean_(sections.SUMMARY),
    skills: list_(sections.SKILLS),
    email,
    phone,
    location: clean_(sections.LOCATION),
    experience,
    role: experience[0]?.role || '',
    company: experience[0]?.company || '',
    yearsExperience: yearsFromSummary_(sections.SUMMARY),
    achievements: list_(sections.ACHIEVEMENTS),
    certifications,
    education: parseEducation_(sections.EDUCATION),
    updatedAt: new Date().toISOString(),
  }
  return ContentService.createTextOutput(JSON.stringify(profile)).setMimeType(ContentService.MimeType.JSON)
}

function splitSections_(text) {
  const headings = ['PROFESSIONAL SUMMARY', 'SUMMARY', 'SKILLS', 'CONTACT', 'LOCATION', 'WORK EXPERIENCE', 'ACHIEVEMENTS', 'CERTIFICATIONS', 'EDUCATION', 'AI & MACHINE LEARNING PROJECTS', 'MACHINE LEARNING & DEEP LEARNING', 'STUDENT ATTENDANCE MANAGEMENT SYSTEM']
  const sections = {}; let active = ''
  text.split(/\r?\n/).map(line => line.trim()).forEach(line => {
    const heading = headings.find(item => line.toUpperCase().startsWith(item))
    if (heading) { active = heading === 'PROFESSIONAL SUMMARY' ? 'SUMMARY' : heading; sections[active] = ''; return }
    if (active) sections[active] += `\n${line}`
  })
  return sections
}
function clean_(value) { return (value || '').replace(/\s+/g, ' ').trim() }
function list_(value) { return (value || '').split(/[\n\u2022,|]/).map(clean_).filter(Boolean) }

function parseExperience_(value) {
  const text = value || ''
  const matches = [...text.matchAll(/([^\n|]{3,80})\s*\|\s*([^\n|]{2,80})\s*\|?\s*([^\n(]{0,60})\s*\(([^)]*(?:Present|\d{4})[^)]*)\)/g)]
  return matches.map((match, index) => {
    const nextStart = matches[index + 1]?.index || text.length
    const details = text.slice(match.index + match[0].length, nextStart)
      .split(/(?:•|-)/).map(clean_).filter(item => item.length > 25).slice(0, 3)
    return { role: clean_(match[1]), company: clean_(match[2]), location: clean_(match[3]), period: clean_(match[4]), points: details }
  })
}

function yearsFromSummary_(value) {
  const match = clean_(value).match(/(?:nearly|over|more than)?\s*(\d+(?:\.\d+)?)\s*years?/i)
  return match ? String(Math.ceil(Number(match[1]))).padStart(2, '0') : ''
}

function parseCertificates_(value) {
  const certificates = []
  let current = null
  ;(value || '').split(/\n+/).map(clean_).filter(Boolean).forEach(line => {
    const isTitle = !/^obtained\b|^demonstrating\b/i.test(line) && /(certif|cloud practitioner|aws)/i.test(line)
    if (isTitle) {
      const [name, url] = line.split('|').map(clean_)
      const date = name.match(/\b\d{1,2}\/\d{4}\b/)?.[0] || ''
      current = { name: name.replace(/\b\d{1,2}\/\d{4}\b/g, '').trim(), date, detail: '', url: /^https?:\/\//i.test(url || '') ? url : '' }
      certificates.push(current)
    } else if (current) {
      current.detail = clean_(`${current.detail} ${line}`)
    }
  })
  return certificates
}

function certificateLinks_(body) {
  let inside = false
  const links = []
  const numChildren = body.getNumChildren()
  for (let i = 0; i < numChildren; i++) {
    const child = body.getChild(i)
    const type = child.getType()
    if (type !== DocumentApp.ElementType.PARAGRAPH && type !== DocumentApp.ElementType.LIST_ITEM) continue
    
    const element = type === DocumentApp.ElementType.PARAGRAPH ? child.asParagraph() : child.asListItem()
    const label = clean_(element.getText())
    const upper = label.toUpperCase()
    
    if (upper === 'CERTIFICATIONS') { inside = true; continue }
    if (inside && /^(AI & MACHINE LEARNING PROJECTS|MACHINE LEARNING & DEEP LEARNING|EDUCATION)/.test(upper)) { inside = false }
    if (!inside || !label) continue
    
    const text = element.editAsText()
    let url = ''
    for (let offset = 0; offset < text.getText().length; offset += 1) {
      url = text.getLinkUrl(offset)
      if (url) break
    }
    if (url) links.push({ name: label, url })
  }
  return links
}

function mergeCertificateLinks_(certificates, links) {
  return certificates.map(certificate => {
    if (certificate.url) return certificate
    const certificateName = certificate.name.toLowerCase()
    const linked = links.find(link => {
      const linkName = link.name.toLowerCase()
      return linkName.includes(certificateName) || certificateName.includes(linkName)
    })
    return { ...certificate, url: linked?.url || '' }
  })
}

function parseEducation_(value) {
  const lines = (value || '').split(/\n+/).map(clean_).filter(Boolean)
  return { degree: lines[0] || '', school: lines[1] || '', date: lines[2] || '', score: lines[3] || '' }
}
