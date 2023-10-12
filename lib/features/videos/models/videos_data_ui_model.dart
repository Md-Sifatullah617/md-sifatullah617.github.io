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
  VideoDataModel(
    title: 'Ostadjee',
    thumbnail: 'assets/project_image/ostadjee.webp',
    videoUrl: 'assets/project_image/ostad.mp4',
    description:
        'Ostadjee.com Limited is a Bangladeshi EdTech company that connects students and tutors 24/7 through website and mobile apps utilizing digital mechanism and confirms security and quality. This platform includes e-learning and examination, job placement and career development and education blog.',
    githubLink: '',
    apkFile: '',
    playStoreLink:
        'https://play.google.com/store/apps/details?id=com.ostadjee.application&pcampaignid=web_share',
  ),
  VideoDataModel(
    title: 'Holy Heart Halal Food BD',
    thumbnail: 'assets/project_image/hhhf.png',
    videoUrl: 'assets/project_image/hhhf.mp4',
    description:
        'Welcome to Holy Heart Halal Food, your one-stop destination for all your grocery needs in Japan. We are proud to offer a wide range of halal-certified products, ensuring that our customers can conveniently access quality groceries while adhering to their dietary requirements.',
    githubLink: 'https://github.com/Md-Sifatullah617/halal-food.git',
    apkFile: '',
    playStoreLink: '',
  ),
  VideoDataModel(
    title: 'Discount Hut',
    thumbnail: 'assets/project_image/dh.png',
    videoUrl: 'assets/project_image/dh.mp4',
    description:
        'Discount Hut is a discount app that helps you find the best deals, discount, and offers on food, fashion, electronics, and more. You can save money on your favorite brands and stores by using the Discount Hut app. Get the best deals, offers, and discounts on food, fashion, electronics, and more.',
    githubLink: 'https://github.com/Md-Sifatullah617/DiscountHut-copy.git',
    apkFile: '',
    playStoreLink: '',
  ),
  VideoDataModel(
    title: 'The Soumi\'s Can Product BD',
    thumbnail: 'assets/project_image/soumi.webp',
    videoUrl: '',
    description:
        "Discover beauty like never before with the Soumis Can Product BD app. Elevate your skincare and makeup game with our curated collection of premium cosmetics. From skincare essentials to makeup must-haves, our app brings you a world of radiant possibilities. Explore, indulge, and redefine your beauty routine with Soumis Can Product BD. Your journey to flawless beauty starts here.",
    githubLink: '',
    apkFile: '',
    playStoreLink:
        'https://play.google.com/store/apps/details?id=com.deshitbd.the_soumis_can_product_bd&pcampaignid=web_share',
  ),
  VideoDataModel(
    title: 'Task Management App',
    thumbnail: 'assets/project_image/todo.png',
    videoUrl: 'assets/project_image/tma.mp4',
    description:
        "A task management app made using Flutter and Rest API. It has features like adding tasks, deleting tasks, updating tasks, etc. It also has features like Profile update, Profile picture update, etc.",
    githubLink: 'https://github.com/Md-Sifatullah617/task_management_app.git',
    apkFile: '',
    playStoreLink: '',
  ),
  VideoDataModel(
    title: 'Blockchain-Based-Property-Registration',
    thumbnail: 'assets/project_image/lrs.png',
    videoUrl: 'assets/project_image/lra.mp4',
    description:
        ' A blockchain-based property registration system made using Ethereum Blockchain. It has features like adding property, deleting property, updating property, etc. ',
    githubLink:
        'https://github.com/Md-Sifatullah617/Blockchain-Based-Property-Registration.git',
    apkFile: '',
    playStoreLink: '',
  ),
  VideoDataModel(
    title: 'Wallify',
    thumbnail: 'assets/project_image/wallify.png',
    videoUrl: 'assets/project_image/wallify.mp4',
    description:
        'Wallify is a wallpaper app made using Flutter and Rest API. It has features like adding wallpaper, deleting wallpaper, updating wallpaper, etc.',
    githubLink: 'https://github.com/Md-Sifatullah617/Wallify.git',
    apkFile: '',
    playStoreLink: '',
  ),
];
