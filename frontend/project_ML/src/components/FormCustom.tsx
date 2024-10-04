import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { getLocation } from "../utils/getLocation";
import { Toaster } from "./ui/toaster";
import { toast } from "../hooks/use-toast";

interface LoginFormProps {
  type: "login" | "register";
}

const FormCustom = (type: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let latitude: number | undefined;
    let longitude: number | undefined;
    let o_location: string = "";
    let isSensitiveDataAccess: boolean = false;
    try {
      const location = await getLocation();
      latitude = location.latitude;
      longitude = location.longitude;

      // Geocodificação reversa
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      const city =
        data.address.city || data.address.town || data.address.village;
      const state = data.address.state;
      const country = data.address.country;
      o_location = `${city}, ${state}, ${country}`;
    } catch (error) {
      console.error("Não foi possível obter a localização:", error);
      o_location = "Desconhecida";
    }

    if (type.type === "register") {
      if (
        password !== confirmPassword ||
        password.length < 8 ||
        !password.match(/[0-9]/) ||
        !password.match(/[a-z]/) ||
        !password.match(/[A-Z]/) ||
        !password.match(/[^a-zA-Z0-9]/)
      ) {
        toast({
          variant: "destructive",
          title: "Senha não são iguais ou não atendem aos requisitos",
          description:
            "A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais, e as senhas devem corresponder.",
        });
        return;
      }
    }

    // Dados a serem enviados ao backend
    const sessionData = {
      email,
      password,
      o_location,
      is_sensitive_data_access: isSensitiveDataAccess,
      latitude,
      longitude,
      actionAcess: type.type,
      // Outros campos podem ser adicionados conforme necessário
    };

    console.log("Dados da sessão:", sessionData);

    // Enviar os dados ao backend
    // try {
    //   const response = await fetch("/api/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(sessionData),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`Erro na requisição: ${response.statusText}`);
    //   }

    //   const result = await response.json();
    //   console.log("Resposta do servidor:", result);

    //   // Redirecionar ou exibir mensagem ao usuário conforme a resposta do backend
    // } catch (error) {
    //   console.error("Erro ao fazer login:", error);
    //   // Trate o erro adequadamente (exibir mensagem ao usuário, etc.)
    // }
  };

  return (
    <div className="w-full max-w-[34.25rem] h-full max-h-[42.18rem]">
      <form
        action=""
        className="px-6 py-24 flex flex-col"
        onSubmit={handleLogin}
      >
        {type.type === "login" ? (
          <>
            <h1 className="font-plus_jakarta leading-9 font-bold text-3xl">
              Entrar
            </h1>
          </>
        ) : (
          <>
            <h1 className="font-plus_jakarta leading-9 font-bold text-3xl">
              Registrar
            </h1>
          </>
        )}

        {type.type === "login" ? (
          <>
            <p className="mt-3 font-inter text-sm leading-5 text-login-text_color flex gap-2">
              Não tem uma conta?
              <Link
                to="/register"
                className="text-login-text_color_secundary font-medium underline decoration-1"
              >
                Registre-se
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className="mt-3 font-inter text-sm leading-5 text-login-text_color flex gap-2">
              Já tem uma conta?
              <Link
                to="/"
                className="text-login-text_color_secundary font-medium underline decoration-1"
              >
                Entrar
              </Link>
            </p>
          </>
        )}

        <div className="mt-6 w-full relative">
          <Input
            className="  rounded-md border-login-border_color h-12 pt-6"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="absolute left-[0.80rem] top-2 font-inter font-medium leading-5  text-login-border_color text-xs">
            Email :
          </p>
        </div>
        <div className="mt-6 w-full relative">
          <Input
            className="rounded-md border-login-border_color h-12 pt-6"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="absolute left-[0.80rem] top-2 font-inter font-medium leading-5  text-login-border_color text-xs">
            Senha :
          </p>
        </div>
        {type.type === "register" ? (
          <>
            <div className="mt-6 w-full relative">
              <Input
                className="rounded-md border-login-border_color h-12 pt-6"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <p className="absolute left-[0.80rem] top-2 font-inter font-medium leading-5  text-login-border_color text-xs">
                Confirmar senha :
              </p>
            </div>
          </>
        ) : null}

        {type.type === "register" ? (
          <>
            <Button className="mt-9 h-12 bg-login-button_color rounded-xl py-3 font-inter font-semibold text-base leading-7 hover:bg-login-button_color hover:opacity-95  hover:duration-500">
              Continue
            </Button>
          </>
        ) : (
          <>
            <Button
              type="submit"
              className="mt-9 h-12 bg-login-button_color rounded-xl py-3 font-inter font-semibold text-base leading-7 hover:bg-login-button_color hover:opacity-95  hover:duration-500"
            >
              Entrar
            </Button>
          </>
        )}
      </form>
      <Toaster />
    </div>
  );
};

export { FormCustom };
