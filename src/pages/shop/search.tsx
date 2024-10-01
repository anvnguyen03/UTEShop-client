import { createContext, useState, ReactNode } from 'react';

interface SearchContextProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export const SearchContext = createContext<SearchContextProps>({
    searchTerm: '',
    setSearchTerm: () => { }
});

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    );
};
