<template>
    <div class="box">
        <div class="header">
            <p>
                <span @click="home"><img src="../assets/logo.svg" alt=""></span>
                <span @click="home">{{ isEnglish ? 'AIWaves Agents' : 'AIWaves Agents' }}</span>
                <span @click="home">{{ isEnglish ? 'Home' : '首页' }}</span>
                <span>
                    <el-dropdown trigger="hover" @command="handleCommand">
                        <span class="el-dropdown-link" @click="push">
                            {{ isEnglish ? "Agents" : "机器人" }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item, index) in Allbot" :key="index" :command="item"
                                @click="handleCommand(item)">{{ isEnglish ? item.desc.translate.botname : item.desc.botname
                                }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
                <span class="new" @click="change_dialogVisible"><span>+</span>{{ isEnglish ? "Create" : "创建"
                }}</span>
                <span class="Toggle" @click="toggleLanguage"><i class="el-icon-sort" id="icon"></i>English/中文</span>
                <span class="min_Toggle" @click="toggleLanguage"><i class="el-icon-sort" id="icon"></i></span>
                <span class="min_meun" @click="drawer = true"><i class="el-icon-s-fold" id="icon"></i></span>
            </p>
        </div>
        <div class="main">
            <div class="left">
                <div class="left_fa" v-for="(item, index) in Allbot" :key="index">
                    <div class="left_son" @click="Toggle(item)">
                        <dl>
                            <dt><img style="zoom: 1.2;margin-top: 15%;margin-left: 30%;z-index: 999;position: relative;"
                                    src="../assets/头像(1).svg" alt="">
                            </dt>
                            <dd>
                                <p style="font-weight: 600; font-size: 20px;">{{ isEnglish ? item.desc.translate.botname :
                                    item.desc.botname
                                }}</p>
                                <p style="font-size: 13px; width: 80%;">{{ isEnglish ? item.desc.translate.output :
                                    item.desc.output }}
                                </p>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class=" left_two">
                    <p> {{ talk_rest }}</p>
                    <p>{{ isEnglish ? 'The rest of the conversation' : '剩下的对话' }}</p>
                </div>
            </div>
            <div class="center">
                <!-- <span style="font-size: 18px;"><i class="el-icon-arrow-left" @click="quit"></i></span> -->
                <h1><i @click="push" class="el-icon-arrow-left"></i> {{ isEnglish ? enName : name }}</h1>
                <div class="talk_rest">
                    <p>{{ isEnglish ? 'Remaining' : '剩余' }}</p>
                    <p> {{ talk_rest }}</p>
                </div>
                <div class="bottom">
                    <el-button @click="reset">{{ isEnglish ? 'Reset' : '清空' }}</el-button>
                    <div class="buttom">
                        <input type="text" v-model="value" @keyup.enter="send">
                        <img class="send" src="../assets/发送按钮.svg" alt="" @click="send">
                    </div>
                </div>
                <div class="center_son">
                    <h3>{{ date }}</h3>
                    <div class="tip">
                        <p>{{ isEnglish ? `Warning: it is a Chinese-speaking agent. For English support, please check out` :
                            `提示：该机器人目前仅支持中文对话，如需英文支持，请访问我们的` }} <a
                                href="https://github.com/aiwaves-cn/agents">github.com</a></p>
                    </div>
                    <!-- <div class="" v-for="(item, index) in messageArr" :key="index">
                        <div class="msg" v-if="item.message.length > 0">
                            <div class="message"
                                :class="{ 'message_left': item.type === 1, 'message_right': item.type === 0 }">
                                <div class="" v-html="item.message"></div>
                                <img style="zoom:0.4 ;" v-if="item.img !== '' || item.img" src="@/assets/img.png" alt=""> -->
                    <!-- <a v-if="item.http !== ''" target="_blank" :href="item.http">{{ item.http }}</a> -->
                    <!-- </div>
                        </div>
                    </div> -->
                    <template>
                        <div class="" v-for="(item, index) in messageArr" :key="index">
                            <div class="msg">
                                <div class="message"
                                    :class="{ 'message_left': item.type === 1, 'message_right': item.type === 0 }">
                                    <div class="" v-html="item.message"></div>
                                    <!-- <img style="zoom:0.4 ;" v-if="item.img !== '' || item.img" src="@/assets/img.png" alt=""> -->
                                    <!-- <a v-if="item.http !== ''" target="_blank" :href="item.http">{{ item.http }}</a> -->
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

        </div>
        <el-dialog :visible.sync="dialogTableVisible" style="text-align: center;">
            <div><i class="el-icon-warning"></i>{{ isEnglish ? 'Hint' : '提示' }}</div>
            <p style="margin-bottom: 10px;">{{ isEnglish ? 'Your number of experience conversations has been used up, please contact us if you want to experience more functions.' : '提示您的体验会话次数已用完，如果您想体验更多功能，请联系我们。' }}</p>
            <p style="margin-bottom: 10px;"><img src="../assets/weixin.jpg" alt=""></p>
            <p>{{ isEnglish ? 'WeChat Scan' : '微信扫描' }}</p>
        </el-dialog>
        <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
            <div v-for="(item, index) in Allbot" :key="index" class="bot" @click="handleCommand(item)">
                {{ isEnglish ? item.desc.translate.botname : item.desc.botname }}
            </div>
        </el-drawer>
    </div>
</template>
  
<script>
import axiso from "axios"
import { setToken, getToken } from '@/utis/storage'
import "../element_two.css"
import "../index.scss"
export default {
    data () {
        var validateCompany = (rule, value, callback) => {
            if (!value) {
                callback(new Error('公司名称不能为空'));
            } else if (value.length > 30) {
                callback(new Error('公司名称不能超过30个字符'));
            } else {
                callback();
            }
        }
        var validateName = (rule, value, callback) => {
            if (!value) {
                callback(new Error('姓名不能为空'));
            } else if (value.length > 10) {
                callback(new Error('姓名不能超过10个字符'));
            } else {
                callback();
            }
        }
        var validateContact = (rule, value, callback) => {
            if (!value) {
                if (this.isEnglish) {
                    callback(new Error('contact information cannot be empty'))
                } else {
                    callback(new Error('联系方式不能为空'))
                }
            } else {
                let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
                let re = /^[1][3,4,5,7,8][0-9]{9}$/
                if (!(reg.test(value) || re.test(value))) {
                    if (this.isEnglish) {
                        callback(new Error('please enter the correct cell phone number or email address'))
                    } else {
                        callback(new Error('请输入正确的手机号码或邮箱'))
                    }
                }
                callback()
            }
        }
        return {
            isEnglish: true,
            Allbot: "",
            data: JSON.parse(localStorage.getItem("data")) || [],
            name: "",
            enName: '',
            messageArr: [],
            date: "",
            value: "",
            talk_rest: "",
            item: {},
            dialogTableVisible: false,
            botcode: "",
            baseURL: '',
            dialogVisible: false,
            ruleForm: {
                company: '',
                name: '',
                position: '',
                contact: '',
                city: '',
            },
            rules: {
                company: [
                    { validator: validateCompany, trigger: 'blur' }
                ],
                name: [
                    { validator: validateName, trigger: 'blur' }
                ],
                contact: [
                    { validator: validateContact, trigger: 'blur' }
                ]
            },
            drawer: false
        }
    },
    methods: {
        push () {
            this.$router.push("/about")
            // if (localStorage.getItem("token")) {
            // } else {
            //     this.dialogVisible = true
            // }
        },
        home () {
            this.$router.push("/")
        },
        change_dialogVisible () {
            if (localStorage.getItem("token")) {
            } else {
                this.dialogVisible = true
            }
        },
        setLanguage () {
            if (getToken('isEnglish') !== undefined) {
                if (getToken('isEnglish') === 'false') {
                    this.isEnglish = false
                } else {
                    this.isEnglish = true
                }
            }
        },
        toggleLanguage () {
            this.isEnglish = !this.isEnglish
            setToken('isEnglish', this.isEnglish)
        },
        handleCommand (command) {
            this.$router.push({
                path: `/botlist`,
                query: { name: command.desc.botname }
            })
        },
        Toggle (item) {
            this.reset()
            console.log(item);
            this.messageArr.push({ type: 1, message: ``, http: '', timestamp: new Date().getTime(), img: "" })
            this.name = item?.desc.botname
            this.botcode = item?.botCode
            this.enName = item?.desc.translate.botname
            this.messageArr[0].message = this.isEnglish ? `您好，我是${this.name}，您有什么问题需要我的帮助？` : `您好，我是${this.name}，您有什么问题需要我的帮助？`
        },
        quit () {
            this.$router.go(-1)
        },
        async send () {
            if (this.talk_rest <= 0) {
                this.dialogTableVisible = true
                return
            }
            this.messageArr.push({ type: 0, message: this.value, http: '', timestamp: new Date().getTime(), img: "" })
            this.messageArr.push({ type: 1, message: "", http: '', timestamp: new Date().getTime(), img: "" })
            this.value = ""
            const that = this
            await axiso({
                method: "post",
                url: this.baseURL + "/api/v1/bot/public_chat",
                data: { query: this.value, user_contact: localStorage.getItem("token"), botCode: this.botcode, history: this.messageArr },
                onDownloadProgress: function (progressEvent) {
                    const simulation = progressEvent.event.currentTarget.responseText;
                    console.log(simulation)
                    let onetext = simulation.replace(/data:|\s/g, "")
                    that.messageArr[that.messageArr.length - 1].message = onetext.replaceAll('"', '').replaceAll('<回复>', '')
                }
            }).then(res => {

            })
            this.get_talk_rest()
        },
        // 清空对话
        reset () {
            this.messageArr = []
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axiso({
                        method: "POST",
                        url: this.baseURL + "/index/regis_company",
                        data: {
                            company_name: this.ruleForm.company,
                            username: this.ruleForm.name,
                            position: this.ruleForm.position,
                            city: this.ruleForm.city,
                            contact: this.ruleForm.contact
                        }
                    }).then((res => {
                        console.log(res);
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        localStorage.setItem("token", this.ruleForm.contact)
                        console.log(this.ruleForm.contact);
                        // this.$router.push("/about")
                    }))

                    this.dialogVisible = false
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        async get_talk_rest () {
            await axiso({
                method: "get",
                url: this.baseURL + `/api/v1/bot/get_talk_rest?user_contact=${localStorage.getItem("token")}`
            }).then((res) => {
                console.log(res)
                this.talk_rest = res.data.talk_rest
            })
        },
        async refresh_token () {
            await axiso({
                method: "post",
                url: this.baseURL + `/index/refresh_token`
            }).then((res) => {
                console.log(res)
            })
        }
    },
    async mounted () {
        if (process.env.NODE_ENV === 'development') {
            // this.baseURL = 'http://192.168.110.200:18876'
            this.baseURL = 'http://aiwaves-agents.com:9099/agent-factory-api'
        } else {
            this.baseURL = 'http://aiwaves-agents.com:9099/agent-factory-api'
        }
        this.setLanguage()
        var currentDate = new Date();
        var year = currentDate.getFullYear();

        // 获取月份（注意月份是从0开始计数）
        var month = currentDate.getMonth() + 1;

        // 获取日期
        var date = currentDate.getDate();

        // 获取小时
        var hours = currentDate.getHours();

        // 获取分钟
        var minutes = currentDate.getMinutes();

        // 获取秒数
        var seconds = currentDate.getSeconds();

        // 格式化月、日、时、分、秒，保证单个数字有前导零
        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        this.date = `${year}/${month}/${date}/${hours}:${minutes}:${seconds}`
        console.log(this.date);
        console.log(this.$route.query.name);
        this.name = this.$route.query.name
        await axiso({
            method: "get",
            url: this.baseURL + "/api/v1/bot/get_public_bots",
        }).then(res => {
            console.log(res.data);
            this.Allbot = res.data
            console.log(this.Allbot);
            this.Allbot.forEach((item, index) => {
                if (item.desc.botname === this.$route.query.name) {
                    this.data = this.data.filter((dataItem) => {
                        return dataItem.desc.botname !== this.$route.query.name
                    });

                    console.log(111);
                    this.data.push(item);
                    this.item = item
                    this.botcode = item.botCode
                    console.log(this.botcode);
                    console.log(this.item);
                    localStorage.setItem("data", JSON.stringify(this.data));
                    console.log(this.data);
                }
            });
        }),
        this.get_talk_rest()
        this.Allbot.forEach((item, index) => {
            console.log(item.botname, this.$route.query.name)
            if (item.desc.botname === this.$route.query.name) {
                this.Toggle(this.Allbot[index])
            }
        })
        // this.Toggle(this.Allbot[0])
    },

}
</script>
  
  
<style scoped lang="scss">
* {
    list-style: none;
    padding: 0;
    margin: 0;
}

#app {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    font-family: 'Times New Roman', Times, serif;

    .box {
        width: 100%;
        height: 100%;
        position: relative;
        background: #fff;

        .header {
            width: 100%;
            height: 80px;
            background: #FFFFFF;
            box-shadow: 0px 2px 4px 0px rgba(150, 150, 150, 0.5);
            display: flex;

            p {
                width: 80%;
                color: #000;
                display: flex;
                align-items: center;
                margin-left: 15px;
                margin-top: 10px;

                .el-dropdown-link {
                    color: #000 !important;
                    margin-left: 15px !important;
                }

                span:nth-child(2) {
                    font-size: 20px;
                    margin-left: 10px;
                    margin-right: 20px;
                }

                span:nth-child(3) {

                    margin-left: 160px;
                    margin-right: 120px;
                }

                .new {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: solid 1px #000;
                    border-radius: 5px 5px;
                    padding-left: 13px;
                    padding-right: 21px;
                    line-height: 20px;
                    position: absolute;
                    right: 323px;
                    height: 36px;

                    span {
                        margin-bottom: 2px;
                        margin-right: 15px;
                        font-size: 30px;
                        font-weight: 600;
                    }
                }

                .Toggle {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: solid 1px #000;
                    border-radius: 5px 5px;
                    padding: 0px 15px;
                    line-height: 20px;
                    position: absolute;
                    right: 100px;
                    height: 36px;
                }

                #icon {
                    transform: rotate(90deg);
                    margin-left: 5px;
                    margin-right: 5px;
                }

                .new:hover {
                    cursor: pointer;
                }

                .Toggle:hover {
                    cursor: pointer;
                }
            }
        }

        .main {
            width: 100vw;
            height: calc(100vh - 90px);
            color: #333333;
            display: flex;
            background: rgb(48, 48, 48);
            justify-content: center;
            margin-top: 90px;

            .left {
                position: relative;
                z-index: 10;
                width: 450px;
                background: #fff;
                border-right: solid 1px #ccc;
                position: relative;

                @media screen and (max-width: 800px) {
                    display: none;
                }

                .left_son {
                    box-sizing: border-box;
                    cursor: pointer;
                    display: flex;
                    margin-bottom: 15px;
                    padding-left: 55px;
                    width: 450px;
                    text-align: center;
                    color: #000;
                    line-height: 40px;

                    dl {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        box-sizing: border-box;
                        width: 100%;

                        dt {
                            padding-top: 3%;
                        }

                        dd {
                            width: 100%;
                            padding-left: 7%;
                            text-align: left;

                            p:nth-child(2) {
                                color: #B4AFAF;
                                width: 250px !important;
                                white-space: nowrap;
                                /* 防止文本换行 */
                                text-overflow: ellipsis;
                                /* 显示省略号 */
                                overflow: hidden;
                                /* 隐藏超出内容 */
                            }
                        }
                    }
                }

                .left_fa:hover {
                    background: #C6C6C6;
                }

                .left_two {
                    position: absolute;
                    bottom: 10%;
                    text-align: center;
                    left: 30%;

                    p:nth-child(1) {

                        border: solid 1px #000;
                        border-radius: 5px;
                        padding: 13px 50px;
                        font-weight: 600;
                        margin-bottom: 20px;
                    }
                }
            }

            .center {
                position: relative;
                flex: 1;
                // max-width: 100%;
                width: 0;
                background: #fff;
                text-align: left;
                overflow: auto;
                overflow-x: hidden;

                @media screen and (max-width: 800px) {
                    padding: 0 18px;
                    overflow: visible;
                }

                .talk_rest {
                    display: none;

                    @media screen and (max-width: 800px) {
                        display: block;
                        position: absolute;
                        top: -10px;
                        right: 18px;
                        z-index: 1000;
                        width: 100px;
                        height: 40px;
                        border: 1px #000 solid;
                        border-radius: 5px;
                        p {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        p:nth-child(1) {
                            background-color: #fff;
                            border-radius: 5px 5px 0 0;
                        }
                        p:nth-child(2) {
                            background-color: #000;
                            border-radius: 0px 0px 5px 5px;
                            color: #fff;
                        }
                    }
                }

                h1 {
                    font-size: 30px;
                    color: #000;
                    padding-top: 20px;
                    padding-left: 30px;

                    @media screen and (max-width: 800px) {
                        margin-bottom: 18px;
                        padding: 0;
                        font-size: 16px;
                        color: #333333;
                    }

                    i {
                        display: none;

                        @media screen and (max-width: 800px) {
                            display: inline-block;
                        }
                    }
                }

                .bottom {
                    box-sizing: border-box;
                    padding: 50px;
                    padding-left: 470px;
                    width: 100%;
                    position: fixed;
                    bottom: 2px;
                    left: 5px;
                    background-color: #fff;

                    @media screen and (max-width: 800px) {
                        padding: 10px 18px;
                    }

                    ::v-deep .el-button {
                        width: 100px;
                        height: 40px;
                        border-radius: 4px;
                        border: 1px solid #333333;
                        position: absolute;
                        right: -20px;
                        top: 10px;

                        @media screen and (max-width: 800px) {
                            right: -50px;
                            top: 5px;
                            width: 48px;
                            height: 19px;
                            border-radius: 4px;
                        }

                        span {
                            font-size: 20px;

                            @media screen and (max-width: 800px) {
                                font-size: 10px;
                                color: #333333;
                            }
                        }
                    }
                }

                .buttom {
                    position: relative;
                    padding-right: 20px;
                    display: flex;
                    justify-content: space-between;
                    // margin: 50px;
                    width: 100%;
                    line-height: 50px;
                    border-radius: 48px;
                    margin-top: 20px;
                    background: #F7F7F7;

                    @media screen and (max-width: 800px) {
                        padding: 0;
                        height: 27px;
                    }

                    input {
                        width: 95%;
                        line-height: 50px;
                        border-radius: 48px;
                        border: none;
                        background: #F7F7F7;
                        font-size: 20px;
                        outline: none;
                        margin-left: 2%;

                        @media screen and (max-width: 800px) {
                            font-size: 14px;
                        }
                    }

                    .send {
                        cursor: pointer;
                        // position: absolute;
                        // bottom: 10px;
                        // right: 10px;
                    }
                }

                .center_son {
                    width: 100%;
                    padding-left: 10px;
                    padding-bottom: 170px;

                    @media screen and (max-width: 800px) {
                        padding: 0;
                    }

                    h3 {
                        width: 100%;
                        text-align: center;
                        margin-bottom: 10px;
                        color: #A0A0A0;
                        font-size: 14px;
                    }

                    .tip {
                        display: flex;
                        justify-content: center;
                        margin-bottom: 50px;

                        @media screen and (max-width: 800px) {
                            margin-bottom: 30px;
                        }

                        p {
                            display: inline-block;
                            padding: 5px;
                            background-color: rgba(237, 237, 237);
                            border-radius: 10px;
                        }
                    }



                    .msg {
                        width: 100%;
                        word-wrap: break-word;
                        overflow: hidden;

                        .message {
                            padding: 0px 10px;
                            line-height: 40px;
                            max-width: 75%;
                            border-radius: 8px;
                            word-wrap: break-word;

                            @media screen and (max-width: 800px) {
                                padding: 7px;
                                font-size: 12px;
                                color: #333333;
                                line-height: 16px;
                            }
                        }

                        .message_left {
                            float: left;
                            color: #333333;
                            background: #EDEDED;
                            margin-left: 20px;
                            margin-bottom: 40px;
                            word-wrap: break-word;

                            @media screen and (max-width: 800px) {
                                margin-left: 0px;
                                margin-bottom: 15px;
                            }
                        }

                        .message_right {
                            float: right;
                            margin-right: 40px;
                            background: #616161;
                            margin-bottom: 40px;
                            word-wrap: break-word;
                            color: #fff;

                            @media screen and (max-width: 800px) {
                                margin-right: 0px;
                                margin-bottom: 15px;
                            }
                        }
                    }
                }
            }


        }

        ::v-deep .el-dialog__wrapper {
            .el-dialog {
                width: 459px;
                height: 380px;
                background-color: #fff;
                border-radius: 8px;

                .el-dialog__body {
                    div {
                        position: absolute;
                        top: 20px;
                        font-size: 18px;
                        color: #000;
                    }
                }
            }
        }
    }
}

::v-deep .el-dialog__wrapper {
    .el-dialog {
        min-width: 500px !important;
        background: #FFFFFF;
        border-radius: 8px;

        @media screen and (max-width: 600px) {
            width: 90% !important;
            min-width: 100px !important;
        }

        .el-dialog__header {
            font-size: 16px;
            font-weight: bold;
            color: #333333;
        }

        .el-dialog__body {
            padding: 0;
        }

        .el-dialog__footer {
            padding: 18px 62px;

            @media screen and (max-width: 600px) {
                padding: 12px 19px;
            }

            .el-button {
                margin-top: 17px;
                width: 77px;
                height: 34px;
                border-radius: 4px;
                border: 1px solid #979797;
            }

            .el-form-item {
                @media screen and (max-width: 600px) {
                    margin-bottom: 10px;
                }
            }

            .el-form-item__label {
                @media screen and (max-width: 600px) {
                    padding: 0;
                }
            }

            .el-button {
                @media screen and (max-width: 600px) {
                    margin: 10px 30px !important;
                }
            }
        }
    }
}

::v-deep .el-drawer__wrapper {
    .el-drawer {
        width: 232px !important;

        .bot {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 44px;
            border-bottom: #F2F2F2 1px solid;
            font-size: 12px;
            color: #959595;
        }

        .bot:hover {
            background-color: #000;
            color: #fff;
        }
    }
}
</style>