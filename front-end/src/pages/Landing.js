import AddIcon from '@material-ui/icons/Add'

import Button from '../Components/Button'

function Landing() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
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
    </div>
  )
}

export default Landing
