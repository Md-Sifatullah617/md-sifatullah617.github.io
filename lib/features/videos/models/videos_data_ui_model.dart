class VideoDataModel {
  final String? title;
  final String? thumbnail;
  final String? videoUrl;
  final String? description;
  final String? githubLink;
  final String? apkFile;
  final String? playStoreLink;
  VideoDataModel({
    this.title,
    this.thumbnail,
    this.videoUrl,
    this.description,
    this.githubLink,
    this.apkFile,
    this.playStoreLink,
  });
  factory VideoDataModel.fromJson(Map<String, dynamic> json) {
    return VideoDataModel(
      title: json['title'],
      thumbnail: json['thumbnail'],
      videoUrl: json['videoUrl'],
      description: json['description'],
      githubLink: json['githubLink'],
      apkFile: json['apkFile'],
      playStoreLink: json['playStoreLink'],
    );
  }
}

List<VideoDataModel> projectsList = [
  //7 projects dummy data
  VideoDataModel(
    title: 'Flutter Chat App',
    thumbnail: 'assets/images/my.jpg',
    videoUrl: 'assets/videos/chat_app.mp4',
    description:
        'A chat app made using Flutter and Firebase. It has features like sending text messages, images, videos, audio, location, etc. It also has features like online status, last seen, etc.',
    githubLink: '',
    apkFile: '',
    playStoreLink: '',
  ),
  VideoDataModel(
    title: 'Flutter E-Commerce App',
    thumbnail: 'assets/images/my.jpg',
    videoUrl: 'assets/videos/ecommerce_app.mp4',
    description:
        'A E-Commerce app made using Flutter and Firebase. It has features like adding products to cart, wishlist, checkout, etc.',
    githubLink: '',
    apkFile: '',
    playStoreLink: '',
  ),
  VideoDataModel(
    title: 'Flutter Food Delivery App',
    thumbnail: 'assets/images/my.jpg',
    videoUrl: 'assets/videos/food_delivery_app.mp4',
    description:
        'A food delivery app made using Flutter and Firebase. It has features like adding products to cart, checkout, etc.',
    githubLink: '',
    apkFile: '',
    playStoreLink: '',
  ),
  VideoDataModel(
    title: 'Flutter News App',
    thumbnail: 'assets/images/my.jpg',
    videoUrl: 'assets/videos/news_app.mp4',
    description:
        'A news app made using Flutter and News API. It has features like searching news, bookmarking news, etc.',
    githubLink: '',
    apkFile: '',
    playStoreLink: '',
  ),
  VideoDataModel(
    title: 'Flutter Quiz App',
    thumbnail: 'assets/images/my.jpg',
    videoUrl: 'assets/videos/quiz_app.mp4',
    description:
        'A quiz app made using Flutter and Open Trivia API. It has features like selecting category, difficulty level, etc.',
    githubLink: '',
    apkFile: '',
    playStoreLink: '',
  ),
  VideoDataModel(
    title: 'Flutter Social Media App',
    thumbnail: 'assets/images/my.jpg',
    videoUrl: 'assets/videos/social_media_app.mp4',
    description:
        'A social media app made using Flutter and Firebase. It has features like posting images, videos, audio, etc. It also has features like online status, last seen, etc.',
    githubLink: '',
    apkFile: '',
    playStoreLink: '',
  ),
];
