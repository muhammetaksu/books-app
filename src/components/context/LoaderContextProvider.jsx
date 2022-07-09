import React, { createContext, useState } from "react";
import { Audio } from "react-loader-spinner";

export const LoaderContext = createContext(null);

export const LoaderContextProvider = ({ children }) => {
    const [loaderIsActive, setLoaderIsActive] = useState(false);

    const AudioLoader = (
        <Audio height="100" width="100" color="grey" ariaLabel="loading" />
    );

    const values = { AudioLoader, loaderIsActive, setLoaderIsActive };

    return (
        <div>
            <LoaderContext.Provider value={values}>
                {children}
            </LoaderContext.Provider>
        </div>
    );
};

export default LoaderContextProvider;
