import * as React from 'react';
import renderer from 'react-test-renderer'
import CommitsGraph, {dateBool, getDaysInMonth} from "./visualCommits";

test('Snapshot commits', () =>{
    const tree = renderer.create(<CommitsGraph />)
    expect(tree).toMatchSnapshot()

})

test('SEP, Find number of days in chosen month', () => {
    const sept = new Date('2021-09-14');
    const resultDays = getDaysInMonth(sept);
    expect(resultDays).toBe(30)
})
test('JAN, Find number of days in chosen month', () => {
    const jan = new Date('2021-01-14');
    const resultDays = getDaysInMonth(jan);
    expect(resultDays).toBe(31)
})

test('Loaded, test getting date (day only) from object', ()=> {
    const serviceStatus = 'loaded';
    const dateObj = new Date('2021-09-07');
    const resultString = dateBool(dateObj, serviceStatus)
    expect(resultString).toBe('07')
})
test('Loaded and Null, test getting date (day only) from object', ()=> {
    const serviceStatus = 'loaded';
    const dateObj = null;
    const resultString = dateBool(dateObj, serviceStatus)
    expect(resultString).toBe('--')
})

test('Not loaded, test getting date (day only) from object', ()=> {
    const serviceStatus = 'error';
    const dateObj = {date: '2021-09-21'};
    const resultString = dateBool(dateObj, serviceStatus)
    expect(resultString).toBe(undefined)
})

