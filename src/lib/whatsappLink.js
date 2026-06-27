const COACH_PHONE = '213XXXXXXXXX'

export function whatsappLink(message = 'Bonjour Coach Sahi, je suis intéressé par le coaching. Pouvez-vous me contacter ?', phone) {
  const number = phone ? phone.replace(/[\s+]/g, '') : COACH_PHONE
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function whatsappOfferLink(pack) {
  const message = `Bonjour Coach Sahi ! Je suis intéressé par le Pack ${pack}. Quand est-ce qu'on peut commencer ?`
  return `https://wa.me/${COACH_PHONE}?text=${encodeURIComponent(message)}`
}
