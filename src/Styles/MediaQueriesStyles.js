import { createGlobalStyle } from "styled-components";

export const MediaQueriesStyles = createGlobalStyle`
  /* Mobile */
  @media (max-width:499px) {
    
    .words {
    font-size: 20px;
    display: flex;
    width: 100%;
  
}
  .header {
    width: 100%;
    /* display: flex; */
    /* justify-content: space-between; */
    /* padding: 1rem 0px; */
    /* margin-left: auto; */
    /* margin-right: auto; */
}
.upper-menu {
    width: 100%;
    /* display: flex; */
    /* margin-left: auto; */
    /* margin-right: auto; */
    /* font-size: 1.3rem; */
    /* justify-content: space-between; */
}
.footer {
    width: 100%;
}
.stats-box {
    display: flex;
    flex-direction: column;
    max-width: 100%;
   
}
.left-stats {
    width: 100%;

}
  }

  /* iPad */
  @media (min-width: 768px) and (max-width: 1023px) {
    .type-box {
        max-width: 100%;
    }
    .header {
         width: 100%;
    }
    .upper-menu {
    width: 100%;
    }
    .words {
    /* font-size: 32px; */
    /* display: flex; */
    width: 100%;
    /* margin-left: auto; */
    /* margin-right: auto; */
    /* flex-wrap: wrap; */
    /* height: auto; */
    /* align-content: center; */
    /* color: #F9F9F9; */
}
    .footer {
        width: 100%;
    }

  }

  /* All devices */
  @media (min-width: 1024px) {
    .type-box {
      
    }
  }
`;
