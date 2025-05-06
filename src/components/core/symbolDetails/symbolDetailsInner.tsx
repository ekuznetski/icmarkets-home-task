'use client';

import { useParams, useRouter } from 'next/navigation';
import { useSymbolDetails } from '@/hooks/useSymbolDetails';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faRedditAlien, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Badge } from '@/components/ui/badge';
import { AddToPortfolio } from '@/components/shared/addToPortfolio';

export function SymbolDetailsInner() {
  const { id } = useParams<{ id: string }>();
  const { data } = useSymbolDetails(id);
  const router = useRouter();

  if (!data) return null;

  const goBack = () => {
    router.push('/');
  };

  return (
    <div className='flex flex-col items-center w-full  bg-background'>
      <Button
        variant='secondary'
        className='self-start ml-4 mt-4 flex items-center gap-2 px-4 py-2 text-base'
        onClick={goBack}
      >
        <FontAwesomeIcon icon={faArrowLeft} className='w-5 h-5' />
        Back
      </Button>
      <div className='flex flex-col items-center gap-3 mt-4'>
        <div className='w-24 h-24 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 shadow mt-2'>
          {data.image && (
            <Image
              src={data.image.large}
              alt={data.name}
              width={80}
              height={80}
              className='rounded-full shadow border-2 border-white dark:border-zinc-900'
            />
          )}
        </div>
        <div className='text-3xl font-bold flex items-center gap-2 mt-2'>
          {data.name}
          <span className='text-lg text-muted-foreground font-normal'>
            ({data.symbol.toUpperCase()})
          </span>
        </div>
        <div className='max-w-2xl text-center text-base mt-2'>
          {data.description?.en ? (
            <span dangerouslySetInnerHTML={{ __html: data.description.en.split('. ')[0] + '.' }} />
          ) : (
            <span>No description available.</span>
          )}
        </div>
      </div>
      <div className='flex flex-wrap gap-2 justify-center mb-2 mt-6 w-full max-w-3xl'>
        {data.categories && data.categories.length > 0 ? (
          data.categories.map((cat) => (
            <Badge
              key={cat}
              variant='outline'
              className='text-xs px-3 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border-muted-foreground/20 text-muted-foreground'
            >
              {cat}
            </Badge>
          ))
        ) : (
          <Badge variant='secondary'>No categories</Badge>
        )}
      </div>
      <hr className='my-2 border-muted-foreground/20 w-full max-w-3xl' />
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-base w-full max-w-3xl'>
        <div>
          <span className='font-semibold'>Market Cap Rank:</span> {data.market_cap_rank ?? 'N/A'}
        </div>
        <div>
          <span className='font-semibold'>Sentiment Up:</span>{' '}
          {data.sentiment_votes_up_percentage !== null
            ? `${data.sentiment_votes_up_percentage}%`
            : 'N/A'}
        </div>
        <div>
          <span className='font-semibold'>Hashing Algorithm:</span>{' '}
          {data.hashing_algorithm || 'N/A'}
        </div>
        <div>
          <span className='font-semibold'>Sentiment Down:</span>{' '}
          {data.sentiment_votes_down_percentage !== null
            ? `${data.sentiment_votes_down_percentage}%`
            : 'N/A'}
        </div>
        <div>
          <span className='font-semibold'>Genesis Date:</span> {data.genesis_date || 'N/A'}
        </div>
        <div>
          <span className='font-semibold'>Country Origin:</span> {data.country_origin || 'N/A'}
        </div>
        <div>
          <span className='font-semibold'>Block Time (min):</span>{' '}
          {data.block_time_in_minutes || 'N/A'}
        </div>
        <div>
          <span className='font-semibold'>Watchlist Users:</span>{' '}
          {data.watchlist_portfolio_users ?? 'N/A'}
        </div>
      </div>
      <hr className='my-2 border-muted-foreground/20 w-full max-w-3xl' />
      <div className='flex flex-wrap gap-4 justify-center mt-2 w-full max-w-3xl'>
        {data.links?.homepage?.[0] && (
          <a
            href={data.links.homepage[0]}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors underline'
          >
            <FontAwesomeIcon icon={faGlobe} className='w-4 h-4' /> Website
          </a>
        )}
        {data.links?.subreddit_url && (
          <a
            href={data.links.subreddit_url}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-1 text-pink-600 hover:text-pink-800 transition-colors underline'
          >
            <FontAwesomeIcon icon={faRedditAlien} className='w-4 h-4' /> Subreddit
          </a>
        )}
        {data.links?.twitter_screen_name && (
          <a
            href={`https://twitter.com/${data.links.twitter_screen_name}`}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-1 text-sky-500 hover:text-sky-700 transition-colors underline'
          >
            <FontAwesomeIcon icon={faTwitter} className='w-4 h-4' /> Twitter
          </a>
        )}
      </div>
      <div className='flex flex-col items-center pt-4 pb-6 px-8 w-full max-w-3xl'>
        <AddToPortfolio
          coinId={data.id}
          className='w-full max-w-xs flex items-center gap-2 text-base font-semibold shadow rounded py-3'
        />
      </div>
    </div>
  );
}
