import { createGlobalStyle } from 'styled-components';
   



export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Urbanist', sans-serif;
    transition: all .5s linear;
  }

  .mainContainer {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 64px;
  transition: all .1s linear;
  }

  .dataContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;
  transition: all .1s linear;
  }

  .header {
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  transition: all .1s linear;
  }
 

  .waveButton {
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.body};
  cursor: pointer;
  max-width: 100%;
  margin: auto 0;
  padding: 8px;
  border: 0;
  border-radius: 5px;
  transition: all .1s linear;
  
  }

  .messageBoxes {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.body};
    margin-top: 100;
    padding: 0.5rem 1.5rem;
    font-size: .8rem;
    cursor: pointer;
    outline: none;
    text-align: center;
    border-radius: 5px;
    transition: all .1s linear;
  }

  .inputElement {
    max-width: 100%;
    background-color: white;
    font-family: 'Urbanist', sans-serif;
    width: 96%;
    justify-content: center;
    text-align: center;
    cursor: text;
    margin-top: 20px;
    margin-right: 5px;
    padding: 8px;
    outline-color: pink;
    border-color: ${({ theme }) => theme.primary};
    border-radius: 5px;
    transition: all .1s linear;
  }

  .bio {
  text-align: center;
  color: ${({ theme }) => theme.text};
  margin-top: 16px;
  transition: all .1s linear;
  }

  .bio2 {
  text-align: center;
  color: ${({ theme }) => theme.text};
  margin-top: 16px;
  transition: all .1s linear;
  }


@keyframes background-color {
    100% {
      background-color: rgb(253, 174, 187);
    }
    100% {
      border-color: rgb(253, 174, 187);
    }
}

button:hover {
  animation-name: background-color;
  animation-duration: 500ms;
  animation-fill-mode: forwards;
}

inputElement:hover {
  animation-name: background-color;
  animation-duration: 500ms;
  animation-fill-mode: forwards;
}

  
`;

export const lightTheme = {
  body: 'white',
  text: '#121212',
  primary: '#6200ee',
};

export const darkTheme = {
  body: '#121212',
  text: 'rgb(177, 177, 177)',
  primary: '#bb86fc',
};
