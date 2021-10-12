import {Select, message, List, Card, Tooltip, Button} from "antd";
import React, {useState, useEffect} from 'react';
import { getRestaurants, getMenus, addItemToCart } from "../utils";
import { PlusOutlined } from "@ant-design/icons"

const { Option } = Select;

function AddToCartButton({itemId}) {  //这个组件就是点击之后会将选项放进购物车   //已经直接对函数的外来参数进行结构

    const [loading, setLoading] = useState(false)

    //add selected Menu to the cart
    const AddToCart = () => {
        //step1:set loading to true
        //step2: add menu to cart and inform the server
        setLoading(true);
        addItemToCart(itemId)
            .then(() => message.success("Successfully add item"))
            .catch((err) => message.error(err.message))
            .finally(() =>
                setLoading(false)
            )
    }

    return (
        <Tooltip title="Add To Shopping Cart" >
            <Button
                    loading = {loading}
                    type = "primary"
                    icon = {<PlusOutlined />}
                    onClick = {AddToCart}
            />
        </Tooltip>
    )
}


function FoodList(props) {

    // const handleChange = function (value) {
    //     console.log("selected ${value}");
    // }

    //current selected option  //记录下当前选择的餐馆的状态，一开始undefined
    const [curRest, setCurRest] = useState();
    //loading restaurant status         //记录下loading的状态
    const [loadingRest, setLoadingRest] = useState(false);
    //restaurant list //用来存restaurant
    const [restaurants, setRestaurants] = useState([]); //这里后端给的数据是一个array，所以是[]，所以前后端要协调
    //loading restaurant menu
    const [loading, setLoading] = useState(false);
    // store menu status
    const [foodData, setFoodData] = useState([]);  // 需要拿到每个餐馆的单独的food list，这样才能在每一次选择不一样的餐馆时，可以做到对food list进行改变

    //fetch menu of current selected restaurant
    useEffect( () =>{
        //step1:set loading menu status
        //step2: fetch menu from the server
        if(curRest) {
            setLoading(true)
            getMenus(curRest)
                .then( response => setFoodData(response)
                )
                .catch(err => message.error(err.message))
                .finally(() => {
                    setLoading(false);
                })
        }
    },[curRest]) //当选择的restaurant改变的时候，就会这个useEffect的作用

    //fetch restaurant list
    useEffect( () => {      // useEffect,给予函数组件生命周期函数，使得在didMount的时候上树。 //使用useEffect组件，使得Select组件上树的时候就能执行，然后加载到餐馆的list
        //step1  set loading restaurant = true  //设置loading为true，使其加载
        //step2 fetch restaurant list from the server
        setLoadingRest(true)
        getRestaurants()
            .then(response => {  //可以使用.then()来接受结果
                setRestaurants(response);
            })
            .catch((err) => {
              message.error(err.message);
            })
            .finally(() => {
                setLoadingRest(false);
            })
    }, []);  //[]表示只发生一次，且在上树的阶段

    return (
        <>
            <Select
                loading={loadingRest}                 //给予loading的值，一开始的loading值是false，即不在loading
                value = {curRest}                    //记录下当前选择的餐馆的
                style={{ width: 300 }}                 //select的风格设置
                placeholder="Select a restaurant"     //啥都没选的时候，会有一个select a restaurant 选项
                onChange={() => {}}               //当点击select的时候触发的事件

                onSelect = {value => setCurRest(value)}  //这个也是当选中的时候，函数参数返回一个选中的restaurant的值
            >
                {
                    restaurants.map(   //map会遍历后端返回的餐馆 array，然后使得回调函数可以返回每一个餐馆的名字和值
                        item => <Option key = {item.id} value = {item.id}> {item.name} </Option>
                    )
                }
            </Select>
            {         //表示只有当curRest不为空的时候，才会显示list1的内容
                curRest && (  <List
                    style={{ marginTop: 20 }}
                    loading={loading}         //拿到menuItem loading状态
                    grid={{
                        gutter: 16,
                        xs: 1,          //当屏幕是属于 一个范围，显示1张图片
                        sm: 2,          //当屏幕是属于 一个范围，显示2张图片
                        md: 4,          //当屏幕是属于 一个范围，显示4张图片
                        lg: 4,          //当屏幕是属于 一个范围，显示4张图片
                        xl: 3,          //当屏幕是属于 一个范围，显示3张图片
                        xxl: 3,         //当屏幕是属于 一个范围，显示3张图片
                    }}
                    itemLayout="horizontal"
                    dataSource={foodData}  //数据来源于menu array
                    renderItem={item => (
                        <List.Item>
                            <Card title= {item.name}
                                  extra={<AddToCartButton itemId = {item.id}/>}  //将添加组件加在这里，但是需要添加itemid，才能知道添加的是那个itemid
                                  style={{ width: 300 }}>
                                <img
                                     src={item.imageUrl}
                                     alt = {item.name}
                                     style={{ height: "auto", width: "100%", display: "block" }}
                                />
                                {`Price: ${item.price}`}
                            </Card>
                        </List.Item>
                    )}
                />)
            }
        </>
    );
}

export default FoodList;