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

// Cheia care face ca formularul de comandă să trimită emailuri, obținută de
// pe https://web3forms.com. Comenzile ajung pe adresa cu care a fost creată.
//
// Dacă se golește, formularul rămâne funcțional, dar trimite comanda pe
// WhatsApp în loc de email.
export const FORM_ACCESS_KEY = "749d5121-5766-4e4a-9cdc-77da063fcd84";
