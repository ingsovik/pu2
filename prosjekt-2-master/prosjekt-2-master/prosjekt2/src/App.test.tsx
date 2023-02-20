import * as React from 'react';
import App from './App';
import Issues from './components/issues';
import renderer from 'react-test-renderer'
import Commits from './components/commits';


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('Issue renders', () =>{
    const tree = renderer.create(<Issues />)
    expect(tree).toMatchSnapshot()
})

describe('Test asynch fetch works', () =>{
    const mockURL = 'https://gitlab.stud.idi.ntnu.no/api/v4/projects/11877/issues'
    const mockData = [{ id: '12341', iid: '1', title: 'Test issue'
        ,state: 'open',
        created_at: {date: '2021-09-16'},
        closed_at: {date: '2021-09-29'}}];
        const getData = jest.fn(url => mockData)
        it('returns data for api call',()=> {
            expect(getData(mockURL)).toBe(mockData)
        });
        it('called getData with mockURL', () =>{
            expect(getData).toHaveBeenCalledWith(mockURL)
        })
})