import React, { createContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const LoaderContext = createContext(null);

export const LoaderContextProvider = ({ children }) => {
    const [loaderIsActive, setLoaderIsActive] = useState(false);

    const tailSpinLoading = (
        <TailSpin height={150} width={150} ariaLabel="loading-indicator" />
    );

    const values = {
        tailSpinLoading,
        loaderIsActive,
        setLoaderIsActive,
    };

    return (
        <div>
            <LoaderContext.Provider value={values}>
                {children}
            </LoaderContext.Provider>
        </div>
    );
};

export default LoaderContextProvider;
