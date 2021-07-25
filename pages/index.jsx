import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import BlogList from '../components/BlogList';

export default function Home() {
  return (
    <BlogList />       
  )
}


