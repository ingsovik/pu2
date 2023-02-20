import * as React from 'react';
import renderer from 'react-test-renderer'
import DayIssues, {isActiveInMonth, isActiveOnDay} from './dayIssues'

test('Snapshot dayIssues', () =>{
    const fakeData:[{ startDay: any, startMonth: any, endDay: any, endMonth: any }] = [{startDay: 1, startMonth: 9, endDay: 0, endMonth: 0}]
    const tree = renderer.create(<DayIssues preData={fakeData}/>)
    expect(tree).toMatchSnapshot()
  
})
test('startmonth=3, endMonth = 5, chosenMonth = 2', () => {
    const startMonth = 3;
    const endMonth = 5;
    const chosenMonth = 2;
    const isActive: boolean = isActiveInMonth(chosenMonth, startMonth, endMonth);
    expect(isActive).toBe(false)

})

test('startmonth=3, endMonth = 3, chosenMonth = 3', () => {
    const startMonth = 3;
    const endMonth = 3;
    const chosenMonth = 3;
    const isActive: boolean = isActiveInMonth(chosenMonth, startMonth, endMonth);
    expect(isActive).toBe(true)

})

test('startmonth=3, endMonth = 5, chosenMonth = 6', () => {
    const startMonth = 3;
    const endMonth = 5;
    const chosenMonth = 6;
    const isActive: boolean = isActiveInMonth(chosenMonth, startMonth, endMonth);
    expect(isActive).toBe(false);

})

test('startmonth=5, endMonth = 3, chosenMonth = 4', () => {
    const startMonth = 5;
    const endMonth = 3;
    const chosenMonth = 4;
    const isActive: boolean = isActiveInMonth(chosenMonth, startMonth, endMonth);
    expect(isActive).toBe(false)

})

test('chosenDay=31, chosenMonth=3, startDay=3, endDay=23, startMonth=3', () =>{
    const chosenDay = 31
    const chosenMonth = 3
    const startDay = 3
    const endDay = 23
    const startMonth = 3
    const isActive: boolean = isActiveOnDay(chosenDay, chosenMonth, startDay, endDay, startMonth);
    expect(isActive).toBe(false)
})

test('chosenDay=32, chosenMonth=3, startDay=3, endDay=23, startMonth=3', () =>{
    const chosenDay = 32
    const chosenMonth = 3
    const startDay = 3
    const endDay = 23
    const startMonth = 3
    const isActive: boolean = isActiveOnDay(chosenDay, chosenMonth, startDay, endDay, startMonth);
    expect(isActive).toBe(false)
})

test('chosenDay=1, chosenMonth=10, startDay=16, endDay=0, startMonth=9', () =>{
    const chosenDay = 1
    const chosenMonth = 10
    const startDay = 16
    const endDay = 0
    const startMonth = 9
    const isActive: boolean = isActiveOnDay(chosenDay, chosenMonth, startDay, endDay, startMonth);
    expect(isActive).toBe(true)
})


