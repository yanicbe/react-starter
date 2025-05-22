import useApiRequest from "@/lib/hooks/use-request";
import { Button } from "@/ui-components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui-components/ui/form";
import { Input } from "@/ui-components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ResetPassword = () => {
  const { apiRequest } = useApiRequest();

  const formSchema = z.object({
    email: z.string().email({ message: "Bitte gib eine gültige Email-Adresse ein" }).min(2, "Füge deine Email hinzu"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const req = {
      mail: data.email,
    };
    const res = await apiRequest("user-profile/reset-password-by-mail", "POST", {
      body: req,
      toast: {
        toastText: "Eine E-Mail zum Passwort zurücksetzen wurde soeben versendet. Prüfen Sie auch das Spam Postfach!",
      },
    });
    if (res.status < 300 && res.status >= 200) {
      window.location.href = "/";
    }
  };

  return (
    <div className="w-full h-full bg-black">
      <div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-20 w-5/12">
          <div className="text-center flex gap-6 items-center justify-center">
            <img src="/logo.png" alt="" className="w-[75px]" />
          </div>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit(onSubmit)();
              }}
              className="bg-white p-8 rounded-lg flex flex-col gap-4"
            >
              <h3 className="text-2xl font-semibold text-center">Bitte gib deine Email Adresse an</h3>
              <div className="form-inputs">
                <div className="row">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="gap-4 mb-4 w-full">
                        <FormLabel className="max-w-[186px] w-full font-bold mt-3 text-md">
                          Email<span className="text-primary">*</span>
                        </FormLabel>
                        <div className="w-full">
                          <FormControl>
                            <Input placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <Button color="white" className="flex gap-2 p-2 text-white self-end" type="submit">
                    <div className="flex items-center justify-center">
                      <Save />
                    </div>
                    <span>Zurücksetzen</span>
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
