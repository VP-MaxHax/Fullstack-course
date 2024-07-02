import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
    <td> {props.text} </td>
    <td> <Statistic value={props.value} /> </td>
    </tr>
  )
}

const Statistic = (props) => {
  return (
    <span>{props.value}</span>
  )
}

const ShowStats = ({ good, bad, neutral }) => {
  console.log(good, bad, neutral)
  if (good+bad+neutral === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={good+bad+neutral} />
        <StatisticLine text='average' value={(good-bad)/(good+bad+neutral)} />
        <StatisticLine text='positive' value={good/(good+bad+neutral)*100 + ' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='give feedback' />
      <div>
        <Button handleClick={() => setGood(good + 1)} text='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='bad' />
      </div>
      <Header text='statistics' />
      <ShowStats good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App