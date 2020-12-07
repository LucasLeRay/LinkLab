import styled from 'styled-components'
import HomeIcon from '@material-ui/icons/HomeOutlined'
import AddIcon from '@material-ui/icons/LibraryAddOutlined'
import SearchIcon from '@material-ui/icons/SearchOutlined'
import { oneOf, func } from 'prop-types'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 48px;
  background: var(--color-grey-4);
  height: 32px;
  width: calc(100% - 96px);

  @media (min-width: 601px) {
    display: none;
  }
`

const IconWrapper = styled.div`
  svg {
    color: var(--color-${(props) => (props.selected ? 'primary' : 'grey-2')});
    width: 48px;
    height: 48px;
  }
`

function MobileFooter({ selected, onClickHome, onClickAdd, onClickSearch }) {
  return (
    <Container>
      <IconWrapper selected={selected === 'home'}>
        <HomeIcon onClick={onClickHome} />
      </IconWrapper>
      <IconWrapper selected={selected === 'add'}>
        <AddIcon onClick={onClickAdd} />
      </IconWrapper>
      <IconWrapper selected={selected === 'search'}>
        <SearchIcon onClick={onClickSearch} />
      </IconWrapper>
    </Container>
  )
}

MobileFooter.propTypes = {
  selected: oneOf(['home', 'add', 'search', 'links']),
  onClickHome: func.isRequired,
  onClickAdd: func.isRequired,
  onClickSearch: func.isRequired,
}

MobileFooter.defaultProps = {
  selected: null,
}

export default MobileFooter
