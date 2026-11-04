export const SITE_URL = "https://fiorisweets.ro";

// Câmpurile lăsate goale ("") nu apar pe site.
export const CONTACT = {
  email: "fiorisweets1@gmail.com",
  // ex. "0712 345 678"
  phone: "0732 535 633",
  // doar cifre, cu prefixul țării, fără + — ex. "40712345678"
  whatsapp: "40732535633",
  // link complet — ex. "https://www.instagram.com/fiorisweets"
  instagram: "",
  facebook: "",
  // ex. "București"
  city: "",
};

// Cheia care face ca formularul de comandă să trimită emailuri.
// Se obține gratuit, în 2 minute, de pe https://web3forms.com — introduci
// adresa fiorisweets1@gmail.com, iar cheia („Access Key”) vine pe email.
// Se lipește aici, între ghilimele.
//
// Cât timp e goală, formularul rămâne vizibil și funcțional, dar în loc să
// trimită emailul trimite comanda completată pe WhatsApp.
export const FORM_ACCESS_KEY = "749d5121-5766-4e4a-9cdc-77da063fcd84";
