import Image from "next/image";
import Link from "next/link";

export default function Map() {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.5330699350043!2d-122.20629592320712!3d47.615768287343855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906c86779db517%3A0xda7188c739364d86!2sBellevue%20Square!5e0!3m2!1sen!2sus!4v1745722710895!5m2!1sen!2sus"
      width="600"
      height="450"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}
