class VideoDataModel {
  final String? title;
  final String? thumbnail;
  final String? videoUrl;
  final String? description;
  final String? githubLink;
  final String? apkFile;
  final String? playStoreLink;
  final String? appStoreLink;
  final String? livePreviewUrl;

  VideoDataModel({
    this.title,
    this.thumbnail,
    this.videoUrl,
    this.description,
    this.githubLink,
    this.apkFile,
    this.playStoreLink,
    this.appStoreLink,
    this.livePreviewUrl,
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
      appStoreLink: json['appStoreLink'],
      livePreviewUrl: json['livePreviewUrl'],
    );
  }
}

List<VideoDataModel> projectsList = [
  VideoDataModel(
    title: 'Charge.AI',
    thumbnail: 'assets/project_image/chargeai.png',
    videoUrl: '',
    description:
        "Charge.AI simplifies managing your electric vehicle (EV) charging experience, offering real-time access to a wide network of charging stations and seamless integration with your fleet. Whether you're at home, work, or on the road, Charge.AI provides a fast, reliable, and smart charging experience tailored to your needs.",
    playStoreLink:
        'https://play.google.com/store/apps/details?id=com.mulytic_energy.chargeai',
    appStoreLink: 'https://apps.apple.com/us/app/charge-ai/id6478091732',
    githubLink: '',
    apkFile: '',
    livePreviewUrl: '',
  ),
  VideoDataModel(
    title: 'Medilogy',
    thumbnail: 'assets/project_image/medilogy.png',
    videoUrl: '',
    description:
        "An all-in-one platform for medical admission preparation. It offers lecture notes, video classes, topic-wise MCQs, and model tests to help students master the syllabus. Users can track progress, get personalized recommendations, and access materials 24/7.",
    playStoreLink:
        'https://play.google.com/store/apps/details?id=com.aap.medilogy',
    appStoreLink: '',
    githubLink: '',
    apkFile: '',
    livePreviewUrl: '',
  ),
  VideoDataModel(
    title: 'Hiye',
    thumbnail: 'assets/project_image/Hiye.webp',
    videoUrl: '',
    description:
        "A health companion app for tribal communities to monitor blood pressure and diabetes. It allows users to track health data, ask questions, read healthcare blogs, and schedule appointments through a user-friendly interface.",
    playStoreLink:
        'https://play.google.com/store/apps/details?id=com.Hiye.hiye',
    appStoreLink: '',
    githubLink: '',
    apkFile: '',
    livePreviewUrl: '',
  ),
  VideoDataModel(
    title: 'Holy Heart Halal Food BD',
    thumbnail: 'assets/project_image/hhhf.png',
    videoUrl: 'https://github.com/Md-Sifatullah617/md-sifatullah617.github.io/releases/download/media-v1/hhhf.mp4',
    description:
        'Welcome to Holy Heart Halal Food, your one-stop destination for all your grocery needs in Japan. We are proud to offer a wide range of halal-certified products, ensuring that our customers can conveniently access quality groceries while adhering to their dietary requirements.',
    githubLink: 'https://github.com/Md-Sifatullah617/halal-food.git',
    apkFile: '',
    playStoreLink: '',
    livePreviewUrl: '',
  ),
  VideoDataModel(
    title: 'Ostadjee',
    thumbnail: 'assets/project_image/ostadjee.webp',
    videoUrl: 'https://github.com/Md-Sifatullah617/md-sifatullah617.github.io/releases/download/media-v1/ostad.mp4',
    description:
        'Ostadjee.com Limited is a Bangladeshi EdTech company that connects students and tutors 24/7 through website and mobile apps utilizing digital mechanism and confirms security and quality. This platform includes e-learning and examination, job placement and career development and education blog.',
    githubLink: '',
    apkFile: '',
    playStoreLink:
        'https://play.google.com/store/apps/details?id=com.ostadjee.application&pcampaignid=web_share',
    livePreviewUrl: '',
  ),
  VideoDataModel(
    title: 'Discount Hut',
    thumbnail: 'assets/project_image/dh.png',
    videoUrl: 'https://github.com/Md-Sifatullah617/md-sifatullah617.github.io/releases/download/media-v1/dh.mp4',
    description:
        'Discount Hut is a discount app that helps you find the best deals, discount, and offers on food, fashion, electronics, and more. You can save money on your favorite brands and stores by using the Discount Hut app. Get the best deals, offers, and discounts on food, fashion, electronics, and more.',
    githubLink: 'https://github.com/Md-Sifatullah617/DiscountHut-copy.git',
    apkFile: '',
    playStoreLink: '',
    livePreviewUrl: '',
  ),
  VideoDataModel(
    title: 'The Soumi\'s Can Product BD',
    thumbnail: 'assets/project_image/soumi.webp',
    videoUrl: '',
    description:
        "Discover beauty like never before with the Soumis Can Product BD app. Elevate your skincare and makeup game with our curated collection of premium cosmetics. From skincare essentials to makeup must-haves, our app brings you a world of radiant possibilities. Explore, indulge, and redefine your beauty routine with Soumis Can Product BD. Your journey to flawless beauty starts here.",
    githubLink: '',
    apkFile: '',
    playStoreLink: '',
    livePreviewUrl: 'https://sifatullah.me/thesoumiscanproductbd/',
  ),
  VideoDataModel(
    title: 'Task Management App',
    thumbnail: 'assets/project_image/todo.png',
    videoUrl: 'https://github.com/Md-Sifatullah617/md-sifatullah617.github.io/releases/download/media-v1/tma.mp4',
    description:
        "A task management app made using Flutter and Rest API. It has features like adding tasks, deleting tasks, updating tasks, etc. It also has features like Profile update, Profile picture update, etc.",
    githubLink: 'https://github.com/Md-Sifatullah617/task_management_app.git',
    apkFile: '',
    playStoreLink: '',
    livePreviewUrl: '',
  ),
  VideoDataModel(
    title: 'Blockchain-Based-Property-Registration',
    thumbnail: 'assets/project_image/lrs.png',
    videoUrl: 'https://github.com/Md-Sifatullah617/md-sifatullah617.github.io/releases/download/media-v1/lra.mp4',
    description:
        ' A blockchain-based property registration system made using Ethereum Blockchain. It has features like adding property, deleting property, updating property, etc. ',
    githubLink: '',
    apkFile: '',
    playStoreLink: '',
    livePreviewUrl: 'https://sifatullah.me/Land-Registration/',
  ),
  VideoDataModel(
    title: 'Wallify',
    thumbnail: 'assets/project_image/wallify.png',
    videoUrl: 'https://github.com/Md-Sifatullah617/md-sifatullah617.github.io/releases/download/media-v1/wallify.mp4',
    description:
        'Wallify is a wallpaper app made using Flutter and Rest API. It has features like adding wallpaper, deleting wallpaper, updating wallpaper, etc.',
    githubLink: 'https://github.com/Md-Sifatullah617/Wallify.git',
    apkFile: '',
    playStoreLink: '',
    livePreviewUrl: '',
  ),
];
