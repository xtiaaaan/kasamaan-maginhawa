import { useState } from 'react';
import { NextPage } from 'next'
import { Button, Input, Space, Image, Typography, Form, AutoComplete } from 'antd'

type Search = {
  cardName? : string
}

const Homepage: NextPage = () => {
  const [cardArt, setCardArt] = useState('');
  const [cardName, setCardName] = useState('');
  const [options, setOptions] = useState<string[]>([])
  const rearArt = 'https://cards.scryfall.io/png/front/1/1/117c3844-cb9b-432f-901a-9cbbaa1da680.png'

  const getRandomCard = async () => {
    try {
      const response = await fetch('https://api.scryfall.com/cards/random')
      const data = await response.json()

      const art = data.image_uris.png
      const name = data.name

      setCardArt(art)
      setCardName(name)
    }
    catch (error) {
      console.error('Error: ', error)
    }
  }

  const searchCard = async (values: any) => {
    try {
      let formatted = values.cardName.replace(/ /g, '+')
      const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${formatted}`)
      const data = await response.json()

      const art = data.image_uris.png
      const name = data.name

      setCardArt(art)
      setCardName(name)
    }
    catch (error) {
      console.error('Error: ', error)
    }
  }

  const autocompleteSearch = async (values: any) => {
    try {
      let formatted = values.replace(/ /g, '+')
      const response = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${formatted}`)
      const data = await response.json()

      const list = data.data

      return list
    }
    catch (error) {
      console.error('Error: ', error)
      return []
    }
  }

  const handleSearch =async (value: string) => {
    const result = await autocompleteSearch(value)
    setOptions(result)
  }

  return (
    <>
      <Space style={{ justifyContent: 'center', backgroundColor: 'grey', width: '100vw', height: '100vh'}}>
        <Space direction='vertical' align='center' style={{ width: '100vw'}}>
          { cardName ?
            <Image
              width={340}
              src={cardArt}
              alt={cardName}
            />
            :
            <Image
              width={340}
              src={rearArt}
            />
          }
          <Button onClick={getRandomCard} style={{ width: 280 }}>Generate A Random Ass Card
          </Button>
          <Typography>OR</Typography>
          <Form
            name='search'
            onFinish={searchCard}
            style={{  minWidth: '100%'}}
          >
            <Form.Item>
              <Button htmlType='submit' style={{ width: 280 }}>Search</Button>
            </Form.Item>
            <Form.Item<Search>
              name='cardName'
              >
                <AutoComplete options={options.map((value) => ({ value }))} onSearch={handleSearch} style={{ width: 280 }}/>
              </Form.Item>
          </Form>
        </Space>
      </Space>
    </>
  )
}

export default Homepage