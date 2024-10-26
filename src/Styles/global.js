import { createGlobalStyle } from "styled-components";


export const GlobalStyles = createGlobalStyle`

*{
    box-sizing: border-box;
}
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Lexend+Deca:wght@100;200;300;400;500;600;700;800;900&family=Michroma&display=swap');
body{
    font-family: 'Inter', sans-serif;
    font-family: 'Lexend Deca', sans-serif;
    font-family: 'Michroma', sans-serif;
    background:${({ theme }) => theme.background};
    color: ${({ theme }) => theme.title};
    padding:0;
    margin:0;
    transition: all 0.25s linear;
    overflow-y: scroll;
    width: 100%;


}

body::-webkit-scrollbar{
    display: none;
}

.canvas {
    display: grid;
    min-height: 100vh;
    grid-auto-flow: row;
    grid-template-rows: auto 1fr auto;
    gap: 0.5rem;
    padding: 1.2rem;
    width: 100% !important;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
}

.type-box{
    display:block;
    width: 100%;
    height: 170px;
    margin-left:auto;
    margin-right:auto;
    overflow: hidden;

}
.type-box::-webkit-scrollbar {
  display: none; /* Hide the scrollbar for webkit-based browsers */
}
.type-box {
  scrollbar-width: none; /* Hide the scrollbar for Firefox */
  -ms-overflow-style: none; /* Hide the scrollbar for IE/Edge */
}


.words {
    font-size: 30px;
    display: flex;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    flex-wrap: wrap;
    height: auto;
    align-content: center;
    color: ${({ theme }) => theme.typeBoxText}
}

.word{
    margin: 5px;
    padding-right:2px;
}

.hidden-input{
    opacity:0;
}

.correct{
    color: ${({ theme }) => theme.title};
}

.incorrect, .extra{
    color: red;
}

.current{
    border-left: 1px solid;
    animation: blinkingLeft 2s infinite;
    animation-timing-function: ease;
    @keyframes blinkingLeft{
        0% {border-left-color:${({ theme }) => theme.textColor};}
        25% {border-left-color:${({ theme }) => theme.background};}
        50% {border-left-color:${({ theme }) => theme.textColor};}
        75% {border-left-color:${({ theme }) => theme.background};}
        100% {border-left-color:${({ theme }) => theme.textColor};}
    }
}

.current-right{
    border-right: 1px solid;
    animation: blinkingRight 2s infinite;
    animation-timing-function: ease;
    @keyframes blinkingRight{
        0% {border-right-color:${({ theme }) => theme.textColor};}
        25% {border-right-color:${({ theme }) => theme.background};}
        50% {border-right-color:${({ theme }) => theme.textColor};}
        75% {border-right-color:${({ theme }) => theme.background};}
        100% {border-right-color:${({ theme }) => theme.textColor};}
    }
}

.skipped{
    color: grey;
}

.footer {
    width: 90%;
    display: flex;
 
    justify-content: space-between;
   
    align-items: center;
    padding: 1rem 0px;
    margin-left: auto;
    margin-right: auto;
}
.hint{
    text-align: center;
    margin-top: 1rem;
}
.actual-footer{
    display: flex;
    justify-content: space-between;
}

.stats-box{
    display: flex;
    max-width: 80%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
}

.left-stats{
    width: 30%;
    padding: 30px;
    height: 300px;
}

.right-stats{
    width: 70%;
}

.title{
    font-size: 20px;
    color: ${({ theme }) => theme.typeBoxText};
}

.subtitle{
    font-size: 30px;
    color: ${({ theme }) => theme.title};
}

a{
    text-decoration: none;
    color: inherit;
}

.upper-menu {
    width: 80%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.3rem;

    justify-content: space-between;
}

.time-modes, .word-modes{
    margin-top: 1rem;
    display:flex;
}
.time, .no-of-word{
    margin-right:5px;
}
.time:hover, .no-of-word:hover{
    color:${({ theme }) => theme.typeBoxText};
    cursor: pointer;
}

.header {
    width: 90%;
    display: flex;

    justify-content: space-between;
    padding: 1rem 0px;
    margin-left: auto;
    margin-right: auto;
}


.user-profile{
    width: 1000px;
    margin-top:60px;
    margin: auto;
    display: flex;
    min-height: 15rem;
    background: ${({ theme }) => theme.typeBoxText};
    border-radius: 20px;
    justify-content: center;
    align-text: center;
}

.user{
    
    width: 50%;
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 1.5rem;
    padding: 1rem;
    border-right: 2px solid;
}

.info{
overflow: 
    width: 60%;
    padding: 1rem;
    margin-top: 1rem;
}
.picture{
    width: 40%;
}

.total-tests{
    width: 50%;
    font-size: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.counter{
    align-items: center;
    margin-top:auto;
    margin-bottom:auto;
}
.table{
    width: 1000px;


    margin: auto;
}
.graph{
width: 1000px;
height: 500px;
margin-left: auto;
margin-right: auto;

}

.center-of-screen{
    display:flex;
    min-height:100vh;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 3rem;
}

.logo{
    display: flex;
    justify-content: center;
}

.compare-btn{
    cursor: pointer;
    color: ${({ theme }) => theme.background};
    background: ${({ theme }) => theme.title};
    padding: 0.3rem;
    border-radius: 5px;
    margin-top: -5px;
}

.instruction{
    color: ${({ theme }) => theme.title};
}

.hint{
    kbd{
        background: ${({ theme }) => theme.title};
        color: ${({ theme }) => theme.background};
        padding: 2.5px 5px;
        border-radius: 4px; 
    }
}

.active{
    border: 1px solid;
    padding: 3px;
    margin: 4px;
}

.active-value{
    border: 1px solid;
    padding: 3px;
    margin: 4px;
    margin-top: -4px;
}


.mode{
    cursor: pointer;
}
.themes {
    display:flex;
    gap: 1em;
    align-items:center;
  width: 200px; /* Set the desired width */
}


`;