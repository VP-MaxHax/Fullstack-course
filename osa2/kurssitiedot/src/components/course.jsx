const Header = (props) => {
    return (
      <h2>{props.course}</h2>
    )
  }
  
  const Content = ( {parts} ) => {
    return ( parts.map(part => <Part key={part.id} part={part} />) )
  }
  
  const Part = (props) => {
    return (
      <p>{props.part.name} {props.part.exercises}</p>
    )
  }
  
  const Total = ( {parts} ) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <p><strong>Number of exercises {total}</strong></p>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </>
    )
  }

    export default Course