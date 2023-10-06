import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { connectToDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: await MongoDBAdapter(connectToDB()), //MongoDB말고 다른 DB에 유저 세션을 저장하고 싶으면 다른 DB adapter를 찾아서 사용
  //redis같은 것들 쓰면 데이터 저장시 하드말고 램을 사용하기 때문에 빨라서 session 방식 구현할 때 인기
  providers: [
    GithubProvider({
        clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
      }),
      CredentialsProvider({
        //1. 로그인페이지 폼 자동생성해주는 코드 
        name: "credentials",
          credentials: {
            email: { label: "email", type: "text" },
            password: { label: "password", type: "password" },
        },
  
        //2. 로그인요청시 실행되는코드
        //직접 DB에서 아이디,비번 비교하고 
        //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
        async authorize(credentials) {
            const client = await connectToDB();  // Call the function to get the client
            const db = client.db('forum');
          let user = await db.collection('user_cred').findOne({email : credentials.email})
          if (!user) {
            console.log('해당 이메일은 없음');
            return null
          }
          const pwcheck = await bcrypt.compare(credentials.password, user.password);
          if (!pwcheck) {
            console.log('비번틀림');
            return null
          }
          return user
        }
      })
      
  ],
   //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
   session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 //30일
  },


  callbacks: {
    //4. jwt 만들 때 실행되는 코드 
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name
        token.user.email = user.email
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;  
      return session;
    },
  },

 
  
 
};
export default NextAuth(authOptions); 