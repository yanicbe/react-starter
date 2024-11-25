import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/ui-components/ui/accordion";
import { Button } from "@/ui-components/ui/button";
import { Mail, Phone, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

const Support = () => {
  return (
    <div className="flex flex-col gap-5 h-full">
      <div className="flex justify-between">
        <div>
          <h1 className="text-[32px] leading-[38px] font-bold text-[#12282A]">Support</h1>
          <p className="text-[16px] text-[#888]">Immer den richtigen Ansprechpartner</p>
        </div>
        <Button className="flex gap-4">
          <Link to="tel:" className="flex gap-3 items-center">
            <PhoneCall /> <span>+41 76 123 1234</span>
          </Link>
        </Button>
      </div>
      <div className="flex gap-5 lg:flex-row flex-col">
        <div className="flex flex-col p-11 bg-white rounded-2xl gap-[14px] lg:w-1/2 w-full">
          <div className="flex gap-3 justify-between">
            <div className="">
              <h3 className="text-2xl font-bold">Hilfe zu den Aufträgen</h3>
              <h4 className="text-[16px] font-bold mt-[18px]">Head of Design</h4>
              <p className="text-[#888] text-sm mt-[8px]">
                Test user
                <br />
                test@besson-it-solutions.ch
                <br />
                09:00 - 17:00 Uhr
                <br />
                +41 76 123 1234
              </p>
            </div>
            <div className="rounded-[20px]  w-[160px] md:w-[180px] lg:w-[200px]">
              <img
                src={"/seehund.jpeg"}
                width={240} // Max width
                height={240} // Maintain aspect ratio
                alt="Test 1"
              />
            </div>
          </div>
          <div className="flex gap-5 mt-6">
            <Button size="sm">
              <Link to="mailto:" className="flex gap-3 items-center">
                <Mail size={18} /> <span>E-Mail schreiben</span>
              </Link>
            </Button>
            <Button size="sm" variant="outline" className="flex gap-3 items-center">
              <Link to="tel:" className="flex gap-3 items-center">
                <Phone size={18} /> <span>Jetzt anrufen</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col p-11 bg-white rounded-2xl gap-[14px] lg:w-1/2 w-full ">
          <div className="flex gap-3 justify-between">
            <div className="">
              <h3 className="text-2xl font-bold">Hilfe bei der Abrechnung</h3>
              <h4 className="text-[16px] font-bold mt-[18px]">Accounting</h4>
              <p className="text-[#888] text-sm mt-[8px]">
                TEST 123
                <br />
                Test ort 4<br />
                1324 Iwo
                <br />
                buchhaltung@besson-it-solutions.de
              </p>
            </div>
            <div className="rounded-[20px] w-[160px] md:w-[180px] lg:w-[200px]">
              <img
                src={"/giraffe.jpeg"}
                width={240} // Max width
                height={240} // Maintain aspect ratio
                alt="Test 2"
              />
            </div>
          </div>
          <div className="flex gap-5 mt-6">
            <Button size="sm">
              <Link to="mailto:" className="flex gap-3 items-center">
                <Mail size={18} /> <span>E-Mail schreiben</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Accordion type="single" defaultValue="item-1" collapsible className="w-full gap-3 flex flex-col mt-12">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center justify-between w-full h-9">
              <p>An wen wende ich mich bei einem Problem innerhalb eines Projektes?</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Bei Problemen innerhalb eines Projektes, kann der Ansprechpartner, welcher für das Projekt zugeteilt wurde,
            weiterhelfen. Dieser ist über die Chatfunktion im jeweiligen Projekt zu erreichen.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="flex items-center justify-between w-full h-9">
              Wer kann mir bei Problemen mit weiterhelfen?
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Sollten Probleme mit auftreten, kann sich an den Head of design gewendet werden. Bei dringlichen Problemen
            ist es ideal diesen anzurufen, ansonsten ist dieser ebenfalls über E-Mail zu erreichen.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <div className="flex items-center justify-between w-full h-9">
              Wer ist für Probleme bei Abrechnungen und Zahlungen zu kontaktieren?
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Wenn es Probleme bei Abrechnungen oder Zahlungen gibt, steht Accounting als Kontaktperson zur Verfügung.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Support;
