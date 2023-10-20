import 'package:akshit_madan/design/utils/app_colors.dart';
import 'package:akshit_madan/features/videos/models/videos_data_ui_model.dart';
import 'package:chewie/chewie.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:readmore/readmore.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:video_player/video_player.dart';

class VideosMobileWidget extends StatefulWidget {
  const VideosMobileWidget({super.key});

  @override
  State<VideosMobileWidget> createState() => _VideosMobileWidgetState();
}

class _VideosMobileWidgetState extends State<VideosMobileWidget> {
  List<VideoPlayerController> videoPlayerControllers = [];

  @override
  void dispose() {
    for (var controller in videoPlayerControllers) {
      controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    double w = MediaQuery.of(context).size.width;
    double h = MediaQuery.of(context).size.height;
    return Container(
        margin: EdgeInsets.only(bottom: h * 0.1),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const Text(
            'Latest Projects',
            style: TextStyle(fontSize: 24),
          ),
          SizedBox(height: h * 0.05),
          RichText(
            textAlign: TextAlign.center,
            text: const TextSpan(
                style: TextStyle(
                    color: Colors.white,
                    fontFamily: 'Preah',
                    fontSize: 16,
                    fontWeight: FontWeight.bold),
                children: [
                  TextSpan(
                      text: ' N.B. ',
                      style: TextStyle(
                          backgroundColor: Colors.yellowAccent,
                          color: Colors.black)),
                  TextSpan(text: ' This website was developed using Flutter.'),
                ]),
          ),
          SizedBox(height: h * 0.02),
          ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: projectsList.length,
              itemBuilder: (context, index) {
                VideoPlayerController controller = VideoPlayerController.asset(
                  projectsList[index].videoUrl!,
                );

                videoPlayerControllers.add(controller);
                return Container(
                    margin: EdgeInsets.only(bottom: h * 0.05),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 10, vertical: 10),
                    decoration: BoxDecoration(
                        color: AppColors.purpleDark.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(10)),
                    child: Column(children: [
                      Container(
                          width: w,
                          height: h * 0.2,
                          decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(10),
                              image: DecorationImage(
                                  image: AssetImage(
                                      projectsList[index].thumbnail!),
                                  fit: BoxFit.cover))),
                      SizedBox(
                        height: h * 0.02,
                      ),
                      Text(projectsList[index].title!,
                          style: const TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold)),
                      SizedBox(height: h * 0.01),
                      ReadMoreText(projectsList[index].description!,
                          trimLines: 2,
                          colorClickableText: Colors.pink,
                          trimMode: TrimMode.Line,
                          trimCollapsedText: 'Show more',
                          trimExpandedText: 'Show less',
                          moreStyle: const TextStyle(fontSize: 12)),
                      SizedBox(height: h * 0.02),
                      Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            if (projectsList[index].githubLink != '')
                              InkWell(
                                  onTap: () => launchUrl(Uri.parse(
                                      projectsList[index].githubLink!)),
                                  child: Container(
                                      alignment: Alignment.center,
                                      height: h * 0.04,
                                      width: w * 0.3,
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 5, vertical: 5),
                                      decoration: BoxDecoration(
                                          border: Border.all(
                                              color: Colors.white, width: 2),
                                          borderRadius:
                                              BorderRadius.circular(10)),
                                      child: const Row(
                                          mainAxisSize: MainAxisSize.min,
                                          children: [
                                            Icon(FontAwesomeIcons.github,
                                                color: Colors.white, size: 15),
                                            SizedBox(width: 10),
                                            Text('Github Link',
                                                style: TextStyle(
                                                    color: Colors.white,
                                                    fontSize: 12))
                                          ]))),
                            const SizedBox(width: 10),
                            if (projectsList[index].videoUrl != '')
                              InkWell(
                                  onTap: () {
                                    showDialog(
                                        context: context,
                                        builder: (context) {
                                          return VideoDialogue(
                                              controller: controller);
                                        });
                                  },
                                  child: Container(
                                      alignment: Alignment.center,
                                      height: h * 0.04,
                                      width: w * 0.3,
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 5, vertical: 5),
                                      decoration: BoxDecoration(
                                          border: Border.all(
                                              color: Colors.white, width: 2),
                                          borderRadius:
                                              BorderRadius.circular(10)),
                                      child: const Row(
                                          mainAxisSize: MainAxisSize.min,
                                          children: [
                                            Icon(FontAwesomeIcons.youtube,
                                                color: Colors.white, size: 15),
                                            SizedBox(width: 10),
                                            Text('Watch Video',
                                                style: TextStyle(
                                                    color: Colors.white,
                                                    fontSize: 12))
                                          ]))),
                            const SizedBox(width: 10),
                            if (projectsList[index].playStoreLink != '')
                              InkWell(
                                  onTap: () => launchUrl(Uri.parse(
                                      projectsList[index].playStoreLink!)),
                                  child: Container(
                                      alignment: Alignment.center,
                                      height: h * 0.04,
                                      width: w * 0.3,
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 5, vertical: 5),
                                      decoration: BoxDecoration(
                                          border: Border.all(
                                              color: Colors.white, width: 2),
                                          borderRadius:
                                              BorderRadius.circular(10)),
                                      child: const Row(
                                          mainAxisSize: MainAxisSize.min,
                                          children: [
                                            Icon(FontAwesomeIcons.googlePlay,
                                                color: Colors.white, size: 15),
                                            SizedBox(width: 10),
                                            Text('Play Store',
                                                style: TextStyle(
                                                    color: Colors.white,
                                                    fontSize: 12))
                                          ]))),
                            const SizedBox(width: 10),
                            if (projectsList[index].apkFile != '')
                              InkWell(
                                  onTap: () => launchUrl(
                                      Uri.parse(projectsList[index].apkFile!)),
                                  child: Container(
                                      alignment: Alignment.center,
                                      height: h * 0.04,
                                      width: w * 0.3,
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 5, vertical: 5),
                                      decoration: BoxDecoration(
                                          border: Border.all(
                                              color: Colors.white, width: 2),
                                          borderRadius:
                                              BorderRadius.circular(10)),
                                      child: const Row(
                                          mainAxisSize: MainAxisSize.min,
                                          children: [
                                            Icon(FontAwesomeIcons.fileDownload,
                                                color: Colors.white, size: 15),
                                            SizedBox(width: 10),
                                            Text('Apk File',
                                                style: TextStyle(
                                                    color: Colors.white,
                                                    fontSize: 12))
                                          ])))
                          ])
                    ]));
              })
        ]));
  }
}

class VideoDialogue extends StatefulWidget {
  const VideoDialogue({
    Key? key,
    required this.controller,
  }) : super(key: key);

  final VideoPlayerController controller;

  @override
  State<VideoDialogue> createState() => _VideoDialogueState();
}

class _VideoDialogueState extends State<VideoDialogue> {
  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: AspectRatio(
        aspectRatio: 16 / 9,
        child: Chewie(
          controller: ChewieController(
            videoPlayerController: widget.controller,
            autoPlay: true,
            looping: true,
            showControls: true,
            allowFullScreen: true,
            allowPlaybackSpeedChanging: false,
            allowMuting: true,
            showOptions: true,
            placeholder: Container(
              color: Colors.black,
            ),
          ),
        ),
      ),
    );
  }
}
