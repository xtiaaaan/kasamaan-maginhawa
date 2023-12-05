import { Layout, Row, Typography } from 'antd'
import React, { useState } from 'react'

const { Header } = Layout

const Topbar: React.FC = () => {
    return (
        <Header>
            <Row>
                <Typography>Bozo</Typography>
            </Row>
        </Header>
    )
}

export default Topbar