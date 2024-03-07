export default function Task({id, title, description, completed}) {
    
    return (
        <li key={id}>
           <p>{title}</p>
           <p>{description}</p>
           <input type="checkbox" checked={completed} readOnly />
        </li>
    )
}