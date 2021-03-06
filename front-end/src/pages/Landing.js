import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'
import { useContext } from 'react'

import Button from '../Components/Button'
import Input from '../Components/Input'
import Context from '../Context'

function Landing() {
  const { handleLogout } = useContext(Context)
  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          width: '304px',
          display: 'flex',
          flexDirection: 'column',
          margin: '8px',
        }}
      >
        <Button emoji="🖥">Web Development</Button>
        <Button emoji="🚀">Startup</Button>
        <Button emoji="📝">Copywriting</Button>
        <Button emoji="🍿">Movies</Button>
        <Button emoji="🛠">Building Stuff</Button>
        <Button emoji="🏎">Cars</Button>
        <Button primary icon={<AddIcon />}>
          Cars
        </Button>
        <Button>Design</Button>
        <Button center onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '8px',
        }}
      >
        <Input value="Blablabla" onChange={() => {}} />
        <Input icon={<SearchIcon />} placeholder="Find anything" />
        <Input label="Email" type="email" />
        <Input label="Password" type="password" />
      </div>
    </div>
  )
}

export default Landing
