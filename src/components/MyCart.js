import React, {useState, useEffect} from 'react';
import {Button, Drawer, Typography, List, message} from "antd";
import {getCart, checkout} from "../utils";

const { Text } = Typography;

function MyCart(props) {
    //display/hide drawer
    const [cartVisible, setCartVisible] = useState(false);
    //set loading
    const [loading , setLoading] = useState(false);
    //state -> cart data->the item in the cart
    const [cartData, setCartData] = useState();
    //set checking loading -->在checking等待的时候设置一个loading
    const [checking, setChecking] = useState(false);


    const onOpenDrawer = () =>{
        setCartVisible(true);
    }

    const onCloseDrawer = () => {
        setCartVisible(false);
    }

    const onCheckOut = () => {
        setChecking(true);
        //inform the server to checkout
        checkout()
            .then(() => {
                message.success('Checkout successfully');
                setCartVisible(false);
            })
            .catch(err => message.error(err.message))
            .finally(() => setChecking(false));
    }

    useEffect( () => {   //每次当cartVisible变化的时候，就去后端获取cart list的数据
        //set loading
        //fetch items added in the cart from the server
        if(cartVisible) {
            setLoading(true);
            getCart()
                .then( response => setCartData(response)) //向后端发送getCart请求，后端返回item list，前端接收
                .catch(err => message.error(err.message))
                .finally(() => setLoading(false))
        }
    },[cartVisible])

    return (
        <>
            <Button type="primary" shape="round" onClick={onOpenDrawer}>
                Cart
            </Button>
            <Drawer title="My Shopping Cart"
                    placement="right"
                    width={520}
                    onClose={onCloseDrawer}
                    visible={cartVisible}
                    footer={
                        <div
                            style = {{
                            display: "flex",  //决定了左右排布
                            justifyContent: "space-between",
                        }}>
                        <Text strong = {true}>{`Total price: $${cartData? cartData.totalPrice : 0}`}</Text>
                            <div>
                                <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
                                    Cancel
                                </Button>
                                <Button
                                    loading = {checking}
                                    onClick = {onCheckOut}
                                    type="primary"
                                >
                                    Checkout
                                </Button>
                            </div>
                        </div>
            }>
                <List
                    loading = {loading}
                    itemLayout = "horizontal"
                    dataSource={cartData ? cartData.orderItemList : []}
                    renderItem = {
                        item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.menuItem.name}
                                    description= {`$${item.price}`}
                                />
                            </List.Item>
                        )
                    }
                />
            </Drawer>
        </>
    );
}

export default MyCart;