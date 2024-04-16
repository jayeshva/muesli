import React, { createContext, useState, useContext } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [selectedLanguage, setSelectedLanguage] = useState("English");

    const languages = {
        English: {
            editCustomerDetails: "Edit Customer Details",
            myOrders: "My Orders",
            mix: "Mix",
            myMuesliMixes: "My Muesli Mixes",
            order: "Order",
            exit: "Exit"
        },
        Deutsch: {
            editCustomerDetails: "Kundendetails bearbeiten",
            myOrders: "Meine Bestellungen",
            mix: "Mischen",
            myMuesliMixes: "Meine Müslimischungen",
            order: "Bestellen",
            exit: "Beenden"
        }
    };

    return (
        <LanguageContext.Provider value={{ selectedLanguage, languages, setSelectedLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    return useContext(LanguageContext);
};
