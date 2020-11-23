import { useContext } from 'react'
import { arrayOf, string } from 'prop-types'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import SearchIcon from '@material-ui/icons/Search'

import Input from './Input'
import Button from './Button'
import Context from '../Context'

const Container = styled.div`
  top: 0;
  left: 0;
  padding: 8px;
  width: 304px;
  min-width: 304px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-5);
`

const CategoriesSubtitle = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin-left: 8px;
  margin-bottom: 8px;
`

const Header = styled.div`
  padding: 8px;
  width: calc(100% - 16px);
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 24px;

  h1 {
    margin: 0;
  }

  svg {
    cursor: pointer;
    width: 32px;
    height: 32px;
  }
`

function Sidebar({ categories }) {
  const { handleLogout } = useContext(Context)

  return (
    <Container>
      <Header>
        <h1>LOGO</h1>
        <LogoutIcon onClick={handleLogout} />
      </Header>
      <Input icon={<SearchIcon />} placeholder="Find anything" />
      <Button primary icon={<AddIcon />}>
        New Link
      </Button>
      <CategoriesSubtitle>All categories</CategoriesSubtitle>
      {categories.map((category) => (
        <Button key={category}>{category}</Button>
      ))}
    </Container>
  )
}

Sidebar.propTypes = {
  categories: arrayOf(string).isRequired,
}

export default Sidebar
