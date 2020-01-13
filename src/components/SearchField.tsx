import * as React from 'react';
import { of, Observable } from "rxjs";
import { TextField, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete'

interface ISearchFiealProps {
    onChange: (event: any) => void;
    onSelect: (text: string) => void;
    companies: TSearchCompany[];
    isLoading: boolean;
}

const SearchField: React.FC<ISearchFiealProps> = ({ onChange, onSelect, companies, isLoading }) => {
    // const handlehEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const subject$ = new Observable<string>(observable => observable.next(event.target.value))
    //     onChange(subject$)
    // }

    return (
        <Autocomplete
            freeSolo
            autoComplete
            includeInputInList
            disableOpenOnFocus
            options={companies}
            getOptionLabel={(option: TSearchCompany) => option.company_full_name}
            renderInput={params => (
                <TextField
                    {...params}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Введите название компании"
                    onChange={onChange}
                    InputProps={{ ...params.InputProps }}
                />)}
            renderOption={(option: TSearchCompany) => {
                if (isLoading) return <CircularProgress />

                return (
                    <span style={{ width: '100%' }} onClick={() => onSelect(option.symbol)}>
                        {option.symbol} | {option.company_full_name}
                    </span>
                )
            }}
        />
    )
}

export default SearchField;