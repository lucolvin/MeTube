import { Video, Category } from '../types';

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Big Buck Bunny',
    description: 'Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself.',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    duration: 596, // 9:56
    path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    uploadDate: '2023-05-15',
    views: 1205,
    category: 'Animation'
  },
  {
    id: '2',
    title: 'Elephant Dream',
    description: 'The first Blender Open Movie from 2006.',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    duration: 653, // 10:53
    path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    uploadDate: '2023-04-10',
    views: 892,
    category: 'Animation'
  },
  {
    id: '3',
    title: 'Sintel',
    description: 'Third Open Movie by Blender Foundation.',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
    duration: 888, // 14:48
    path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    uploadDate: '2023-06-22',
    views: 723,
    category: 'Animation'
  },
  {
    id: '4',
    title: 'Tears of Steel',
    description: 'Tears of Steel was realized with crowd-funding by users of the open source 3D creation tool Blender.',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',
    duration: 734, // 12:14
    path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    uploadDate: '2023-02-28',
    views: 1432,
    category: 'Sci-Fi'
  },
  {
    id: '5',
    title: 'Subaru Outback On Street',
    description: 'Driving down a street in a Subaru Outback.',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg',
    duration: 603, // 10:03
    path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    uploadDate: '2023-07-05',
    views: 345,
    category: 'Automotive'
  },
  {
    id: '6',
    title: 'For Bigger Meltdowns',
    description: 'Introducing Chromecast. The easiest way to enjoy online video and music on your TV.',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg',
    duration: 15,
    path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    uploadDate: '2023-01-12',
    views: 2567,
    category: 'Commercial'
  },
  {
    id: '7',
    title: 'For Bigger Blazes',
    description: 'HBO GO now works with Chromecast.',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    duration: 15,
    path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    uploadDate: '2023-03-17',
    views: 1932,
    category: 'Commercial'
  },
  {
    id: '8',
    title: 'For Bigger Escapes',
    description: 'Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for the times that call for bigger entertainment.',
    thumbnail: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
    duration: 15,
    path: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    uploadDate: '2023-08-21',
    views: 876,
    category: 'Commercial'
  }
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'All',
    videos: mockVideos
  },
  {
    id: '2',
    name: 'Animation',
    videos: mockVideos.filter(video => video.category === 'Animation')
  },
  {
    id: '3',
    name: 'Sci-Fi',
    videos: mockVideos.filter(video => video.category === 'Sci-Fi')
  },
  {
    id: '4',
    name: 'Automotive',
    videos: mockVideos.filter(video => video.category === 'Automotive')
  },
  {
    id: '5',
    name: 'Commercial',
    videos: mockVideos.filter(video => video.category === 'Commercial')
  },
  {
    id: '6',
    name: 'Recently Added',
    videos: [...mockVideos].sort((a, b) => 
      new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    ).slice(0, 5)
  },
  {
    id: '7',
    name: 'Most Viewed',
    videos: [...mockVideos].sort((a, b) => b.views - a.views).slice(0, 5)
  }
];