import React, { useState, createContext, FC, useContext } from 'react'
import DatePicker from 'react-date-picker'

const DateContext = createContext<Date>(new Date());

/**
 * Custom hook using DateContext
 * @returns DateContext as a context
 */
export function useDate() {
    return useContext(DateContext)
}

/**
 * Functional component, a context provider to setContext.
 * Uses session storage to set context during session. 
 * Contains DatePicker jsx to pick a date from a calendar
 * @param param0 children to 'inherit' custom hook
 * @returns jsx for Provider and DatePicker
 */
export const DateProvider: FC = ({ children }) => {

    /**
     * Function to get value saved in sessionStorage, only if the sessionStorage is supported and not undefined
     * @returns value saved in sessionStorage, alert if sessionStorage is not supported
     */
    function getSessionStorage() {
        if (sessionStorage) {
            if (sessionStorage !== undefined) {
                return sessionStorage.getItem('picked-date');
            }
        } else {
            alert('Browser does not support session storage')
        }
    }

    /**
     * Function to format input as a string to a Date object
     * @param inputString 
     * @returns string as Date object
     */
    function stringDateToDate(inputString: string | null | undefined) {
        let updatedDate = new Date()

        const year = inputString?.substr(0, 4);
        const month = inputString?.substr(5, 2);
        const day = inputString?.substr(8, 2);

        if (year !== undefined && month !== undefined && day !== undefined) {
            const yearInt = parseInt(year);
            const monthInt = parseInt(month);
            const dayInt = parseInt(day);
            updatedDate.setFullYear(yearInt);
            updatedDate.setMonth(monthInt - 1);
            updatedDate.setDate(dayInt)
        }
        if (updatedDate !== null && updatedDate !== undefined) {
            return updatedDate
        }
        return updatedDate
    }

    const sessionStorageValue = getSessionStorage()
    const defaultValue = stringDateToDate(sessionStorageValue);
    const [date, setDate] = useState(defaultValue)

    /**
     * Function to set both sessionStorage and date state to the same input value
     * @param inputDate 
     */
    function setNewDate(inputDate: Date) {
        setDate(inputDate);
        if (sessionStorage) {
            sessionStorage.setItem('picked-date', inputDate.toISOString())
        } else {
            alert('Does not support sessionStorage')
        }
    };

    return (
        <div className="dateContext">
            <div id="datePicker">
                <label id="pickDateLabel">Pick date:</label>
                <DatePicker
                    value={date}
                    onChange={(newDate: Date) => setNewDate(newDate)}
                    showWeekNumbers
                    clearIcon={null}
                />
            </div>
            <div id="dateContextProviderGraph">
                <DateContext.Provider value={date}>
                    {children}
                </DateContext.Provider>
            </div>
        </div>
    )
}
