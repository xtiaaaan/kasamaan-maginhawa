import { useState } from 'react';
import { Button, Input, Space, Image, Typography, Form } from 'antd'

type Search = {
  cardName? : string
}

export default function Home() {
  const [cardArt, setCardArt] = useState('');
  const [cardName, setCardName] = useState('');

  const getRandomCard = async () => {
    try {
      const response = await fetch('https://api.scryfall.com/cards/random')
      const data = await response.json()

      const art = data.image_uris.normal
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
      console.log('Values: ', values.cardName)
      let formatted = values.cardName.replace(/ /g, '+')
      console.log('Formatted', formatted)
      const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${formatted}`)
      const data = await response.json()

      const art = data.image_uris.normal
      const name = data.name

      setCardArt(art)
      setCardName(name)
    }
    catch (error) {
      console.error('Error: ', error)
    }
  }

  return (
    <>
      <Space direction='vertical' align='center' style={{ justifyContent: 'center', backgroundColor: 'grey', width: '100vw', height: '100vh'}}>
        { cardName ?
          <Image
            width={340}
            src={cardArt}
            alt={cardName}
          />
          :
          <Space style={{ width: 488, height: 680 }} />
        }
        <Button onClick={getRandomCard}> Random Ass Card
        </Button>
        <Typography>OR</Typography>
        <Form
          name='search'
          onFinish={searchCard}
          style={{ justifySelf: 'center'}}
        >
          <Form.Item>
            <Button htmlType='submit'>Search</Button>
          </Form.Item>
          <Form.Item<Search>
            name='cardName'
            >
              <Input placeholder='Search for a card'/>
            </Form.Item>
        </Form>
      </Space>
    </>
  )
}
