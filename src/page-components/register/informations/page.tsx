import useApiRequest from "@/lib/hooks/use-request";
import { Button } from "@/ui-components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui-components/ui/form";
import { Input } from "@/ui-components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

// Define your Zod schema
const formSchema = z.object({
  company: z.string(),
  vatId: z.string().min(1, {
    message: "Ust Id ist erforderlich",
  }),
  street: z.string().min(1, {
    message: "Straße ist erforderlich",
  }),
  houseNumber: z.string().min(1, {
    message: "Hausnummer ist erforderlich",
  }),
  postCode: z.string().min(1, {
    message: "Postleitzahl ist erforderlich",
  }),
  city: z.string().min(1, {
    message: "Ort ist erforderlich",
  }),
  country: z.string().min(1, {
    message: "Land ist erforderlich",
  }),
  invoiceMail: z
    .string()
    .min(1, {
      message: "Email ist erforderlich",
    })
    .email({
      message: "Ungültige E-Mail-Adresse",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

const RegisterInformationsParent = () => {
  const { apiRequest } = useApiRequest();
  const [loading, setLoading] = useState(true);
  const [orgaName, setOrgaName] = useState<string>();

  const getOrgaName = useCallback(async () => {
    setLoading(true);
    const res = await apiRequest<{
      organizationName: string;
    }>("organizations/customer/creation-entities", "GET");
    if (res.data) {
      setOrgaName(res.data.organizationName);
    }
    setLoading(false);
  }, [apiRequest]);

  useEffect(() => {
    getOrgaName();
  }, [getOrgaName]);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <>{orgaName ? <RegisterInformations orgaName={orgaName} /> : "No organization name found"}</>
      )}
    </>
  );
};

const RegisterInformations = ({ orgaName }: { orgaName: string }) => {
  const [loading] = useState(false);
  const { apiRequest } = useApiRequest();
  const navigate = useNavigate();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: orgaName,
      vatId: "",
      street: "",
      houseNumber: "",
      postCode: "",
      city: "",
      country: "",
      invoiceMail: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    // Handle form submission here
    const req = {
      company: data.company,
      vatId: data.vatId,
      street: data.street,
      houseNumber: data.houseNumber,
      postCode: data.postCode,
      city: data.city,
      country: data.country,
      invoiceMail: data.invoiceMail,
    };
    const res = await apiRequest("organizations/customer", "POST", {
      body: req,
      // toast: {
      //   toastText: "Organisation erstellt",
      // },
    });
    if (res.status >= 200 && res.status < 300) {
      navigate("/register/users");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 h-full">
        <div className="flex flex-col h-full justify-around items-center mx-32 gap-8">
          <div className="bg-white p-9 rounded-2xl flex flex-col items-center justify-between border border-[#D0D5DD] min-w-[686px]">
            <h2 className="text-[32px] font-bold text-center leading-9">Daten zum Unternehmen</h2>
            <p className="text-[#888] font-bold text-center">Vervollständige Deine Daten</p>

            <div className="flex gap-4 my-5 w-full">
              <div className="flex flex-col w-1/2">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-bold text-[#12282A]">Unternehmensname:*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Muster Gmbh" className="w-full" disabled={true} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <FormField
                  control={form.control}
                  name="vatId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-bold text-[#12282A]">Ust.Id.:*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ust.Id" className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-4 mb-5 w-full">
              <div className="flex flex-col w-1/2">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-bold text-[#12282A]">Straße:*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Straße" className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col w-1/2 gap-3">
                <FormField
                  control={form.control}
                  name="houseNumber"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-bold text-[#12282A]">Hausnummer:*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Hausnummer" className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-4 mb-5 w-full">
              <div className="flex flex-col w-1/2 gap-3">
                <FormField
                  control={form.control}
                  name="postCode"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-bold text-[#12282A]">Postleitzahl:*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Postleitzahl" className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col w-1/2 gap-3">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-bold text-[#12282A]">Ort:*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ort" className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-4 mb-5 w-full">
              <div className="flex flex-col w-1/2 gap-3">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-bold text-[#12282A]">Land:*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Land" className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col w-1/2 gap-3">
                <FormField
                  control={form.control}
                  name="invoiceMail"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-bold text-[#12282A]">E-Mail für Rechnungen:*</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} placeholder="E-Mail" className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              type="submit"
              variant="default"
              className="text-white font-bold flex items-center gap-2 hover:gap-3 w-full transition-all"
            >
              <span>
                <span>{loading ? "Loading..." : "Weiter"}</span>
              </span>
              {!loading && <MoveRight size="20" />}
            </Button>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex items-center text-xl font-bold">
              <div className="w-1/2 relative">
                <div className="absolute top-4 left-5 bg-white w-full h-2"></div>
                <div className="flex relative z-20 justify-center items-center text-white bg-[#12282A] w-10 h-10 rounded-full">
                  1
                </div>
              </div>
              <div className="w-1/2 relative">
                <div className="absolute top-4 left-5 bg-white w-full h-2"></div>
                <div className="flex relative z-20 justify-center items-center  text-[#CCCCCC] bg-white w-10 h-10 rounded-full">
                  2
                </div>
              </div>
              <div>
                <div className="flex relative z-20 justify-center items-center text-[#CCCCCC] text-xl bg-white w-10 h-10 rounded-full">
                  3
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold">
              <div className="w-24">Daten</div>
              <div className="text-[#CCCCCC] w-32 text-center">Benutzer</div>
              <div className="text-[#CCCCCC] w-24 text-right">Onboarding</div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RegisterInformationsParent;
