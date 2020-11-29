import styled from 'styled-components'
import { string, arrayOf, shape, func } from 'prop-types'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 192px;
  width: 288px;
  margin: 24px;
  background-color: var(--color-grey-4);
  border-radius: 10px;
`

const Overlay = styled.div`
  position: absolute;
  border-radius: 10px 10px 0 0;
  top: 0;
  left: 0;
  height: 144px;
  width: 288px;
  background: ${(props) => (props.img ? `url('${props.img}')` : '#fff')};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const BlackLayer = styled.div`
  background-color: rgba(0, 0, 0, 0.72);
  border-radius: 10px 10px 0 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 144px;
  width: 288px;
`

const Title = styled.div`
  z-index: 1;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 144px;
  width: 288px;
  font-weight: 700;
  font-family: var(--font-head);
  font-size: 24px;
  margin: auto;
`

const Footer = styled.div`
  width: calc(100% - 16px);
  position: absolute;
  bottom: 0;
  padding: 0 8px;
  height: 48px;
  display: flex;
  align-items: center;
`

const Tag = styled.div`
  background-color: var(--color-grey-5);
  border-radius: 8px;
  padding: 2px 8px;
  margin-right: 8px;
  font-size: 16px;
  text-transform: capitalize;
  cursor: pointer;
`

const LinkWrapper = styled.a`
  color: var(--color-grey-1);
`

const TagsWrapper = styled.div`
  overflow: auto;
  display: flex;
  width: 100%;
  margin-right: 8px;

  ::-webkit-scrollbar {
    display: none;
  }
`

const Options = styled.div`
  display: flex;
  color: var(--color-grey-2);

  svg {
    cursor: pointer;
    width: 24px;
    height: 24px;
  }
`

const Separator = styled.span`
  height: 24px;
  width: 1px;
  margin: 0 8px;
  background-color: var(--color-grey-2);
`

function LinkCard({ link, selectedTag, setSelectedTag }) {
  const { title, img, url, tags } = link
  return (
    <Container>
      <LinkWrapper href={url} target="_blank" rel="noreferrer">
        <Title>{title}</Title>
        <Overlay img={img}>
          <BlackLayer />
        </Overlay>
      </LinkWrapper>
      <Footer>
        <TagsWrapper>
          {tags.map((tag) => (
            <Tag
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              {tag}
            </Tag>
          ))}
        </TagsWrapper>
        <Options>
          <EditIcon />
          <Separator />
          <DeleteIcon />
        </Options>
      </Footer>
    </Container>
  )
}

LinkCard.propTypes = {
  link: shape({
    id: string.isRequired,
    title: string.isRequired,
    img: string,
    url: string.isRequired,
    tags: arrayOf(string).isRequired,
  }).isRequired,
  selectedTag: string,
  setSelectedTag: func,
}

LinkCard.defaultProps = {
  selectedTag: null,
  setSelectedTag: () => {},
}

export default LinkCard
