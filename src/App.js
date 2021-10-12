import { Layout, Typography } from "antd";
import { useState } from "react";
import FoodList from "./components/FoodList";
import LoginForm from "./components/LoginForm";
import MyCart from "./components/MyCart";
import SignupForm from "./components/SignupForm";

const { Header, Content } = Layout;
const { Title } = Typography;  //从Typography组件下面拿到Title组件

function App() {
    const [authed, setAuthed] = useState(false);// 登陆状态的初始值为false，但是当onSuccess函数成功调用时，aythed变为true。

    return (                                    // 表示layout占满页面的百分之百
        <Layout style={{ height: "108vh" }}>
            <Header>
                <div className="header" style={{display: "flex", justifyContent: "space-between"}}>
                    <Title
                        level={2}
                        style={{ color: "white", lineHeight: "inherit", marginBottom: 0 }}
                    >Haojie's Food PlatForm</Title>
                    <div>{authed ? <MyCart /> : <SignupForm />}</div>
                </div>
            </Header>
            <Content
                style={{
                    padding: "50px",
                    maxHeight: "calc(100% - 64px)",    // 页面的最大值，减去head的高度（header高度为64px）
                    overflowY: "auto",
                }}
            >
                {authed ?               //如果是登录的，那么切换，authed变了值就会rerender（）
                    <FoodList />
                 :                  // 此处进行loginForm的实例化
                    <LoginForm  Onsuccess = { () => setAuthed(true) }/> // React 的写法。见React（state&event） 章节
                }
            </Content>
        </Layout>
    );
}

export default App;