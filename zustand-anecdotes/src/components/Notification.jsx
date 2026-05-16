import { useNotif} from '../notifStore'

const Notification = () => {
  const notif = useNotif()

  if (!notif) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return (
  <div style={style}>
    {notif}
  </div>
)}

export default Notification