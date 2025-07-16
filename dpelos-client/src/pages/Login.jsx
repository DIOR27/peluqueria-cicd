import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import dpelosn from "../assets/dpelosn.svg";
import { Image } from "../components/ui/Image";
import { Button } from "../components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { Formik, Form } from "formik";
import FormInput from "../components/ui/FormInput";
import FormPasswordInput from "../components/ui/FormPasswordInput";
import * as Yup from "yup";
import useAuthStore from "../stores/authStore";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Formato de email inválido")
    .required("El email es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
});

export default function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300); 

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    const sucess = await login(values.email, values.password);
    if (sucess) {
      navigate("/panel");
    }
    setSubmitting(false);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gray-100"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 1s ease-in-out",
      }}
    >
      <Link
        className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-gray-500 mb-4 gap-2"
        to="/"
      >
        <ArrowLeft className="w-5" />
        Regresar a página de inicio
      </Link>

      <Image
        src={dpelosn}
        alt="Logo D'Pelos"
        className="mb-4"
        width={128}
        height={30}
        priority
      />

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Iniciar Sesión</h1>
          <p className="text-gray-600 mt-2">
            Ingresa tus credenciales para acceder
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormInput
                label="Correo Electrónico"
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
              />
              <FormPasswordInput
                label="Contraseña"
                name="password"
                placeholder="Ingresa tu contraseña"
              />
              <div className="flex items-center justify-end mb-8">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-gold-600 hover:text-gold-500 ml-2"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>

              <div>
                <Button
                  className="w-full"
                  type="subtmit"
                  disabled={isSubmitting}
                >
                  Iniciar Sesión
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

