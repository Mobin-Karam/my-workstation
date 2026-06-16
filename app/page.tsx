import ContactForm from "./components/ContactForm";
import Providers from "./providers";

export default function Home() {
  return (
    <>
      <Providers>
        <ContactForm />
      </Providers>
    </>
  );
}
