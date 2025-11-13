import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Private = () =>{

    const { store } = useGlobalReducer();
    const { auth } = store;


    return (
      <div className="container py-5">
        <h1 className="mb-4">Perfil</h1>
          <p className="lead">
            Si puedes leer esto es porque tu sesión y token fueron validados
            correctamente.
          </p>
      </div>
  );
};