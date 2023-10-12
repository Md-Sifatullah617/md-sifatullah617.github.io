import 'package:akshit_madan/features/videos/models/videos_data_ui_model.dart';
import 'package:chewie/chewie.dart';
import 'package:flutter/material.dart';
import 'dart:html' as html;

import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:readmore/readmore.dart';
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
                      Row(children: [
                        if (projectsList[index].githubLink != '')
                          InkWell(
                              onTap: () => html.window.open(
                                  projectsList[index].githubLink!, '_blank'),
                              child: Expanded(
                                child: Container(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 10, vertical: 5),
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
                                        ])),
                              )),
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
                              child: Expanded(
                                child: Container(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 10, vertical: 5),
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
                                        ])),
                              )),
                        const SizedBox(width: 10),
                        if (projectsList[index].playStoreLink != '')
                          InkWell(
                              onTap: () => html.window.open(
                                  projectsList[index].playStoreLink!, '_blank'),
                              child: Expanded(
                                child: Container(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 10, vertical: 5),
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
                                        ])),
                              )),
                        const SizedBox(width: 10),
                        if (projectsList[index].apkFile != '')
                          InkWell(
                              onTap: () => html.window
                                  .open(projectsList[index].apkFile!, '_blank'),
                              child: Container(
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 10, vertical: 5),
                                  decoration: BoxDecoration(
                                      border: Border.all(
                                          color: Colors.white, width: 2),
                                      borderRadius: BorderRadius.circular(10)),
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
    super.key,
    required this.controller,
  });

  final VideoPlayerController controller;

  @override
  State<VideoDialogue> createState() => _VideoDialogueState();
}

class _VideoDialogueState extends State<VideoDialogue> {
  GlobalKey videoPlayerKey = GlobalKey();
  bool isLeftSide = false;
  bool isRightSide = false;
  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: Stack(
        children: [
          AspectRatio(
            aspectRatio: 16 / 9,
            child: Expanded(
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
          ),
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            child: GestureDetector(
              behavior: HitTestBehavior.opaque,
              onTapUp: (details) {
                print("GestureDetector tapped");
                final screenWidth = MediaQuery.of(context).size.width;
                final tapPosition = details.localPosition.dx;
                final position = widget.controller.value.position;
                const seekDuration = Duration(seconds: 10);

                if (tapPosition < screenWidth / 2) {
                  widget.controller.seekTo(position - seekDuration);
                  setState(() {
                    isLeftSide = true;
                    print("tapPosition $tapPosition");
                    Future.delayed(const Duration(seconds: 1), () {
                      setState(() {
                        isLeftSide = false;
                      });
                    });
                  });
                } else {
                  widget.controller.seekTo(position + seekDuration);
                  setState(() {
                    isRightSide = true;
                    print("tapPosition $tapPosition");
                    Future.delayed(const Duration(seconds: 1), () {
                      setState(() {
                        isRightSide = false;
                      });
                    });
                  });
                }
              },
              child: Row(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: isLeftSide
                    ? MainAxisAlignment.start
                    : MainAxisAlignment.end,
                children: [
                  Visibility(
                    visible: isLeftSide,
                    child: Container(
                        height: widget.controller.value.size.height,
                        width: widget.controller.value.size.width * 0.4,
                        decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.2),
                            borderRadius: BorderRadius.only(
                                topRight: Radius.circular(
                                    widget.controller.value.size.width * 0.4),
                                bottomRight: Radius.circular(
                                    widget.controller.value.size.width * 0.4))),
                        child: Icon(
                          Icons.fast_rewind,
                          size: 50,
                          color: Colors.white.withOpacity(0.5),
                        )),
                  ),
                  Visibility(
                    visible: isRightSide,
                    child: Container(
                        height: widget.controller.value.size.height,
                        width: widget.controller.value.size.width * 0.4,
                        decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.2),
                            borderRadius: BorderRadius.only(
                                topLeft: Radius.circular(
                                    widget.controller.value.size.width * 0.4),
                                bottomLeft: Radius.circular(
                                    widget.controller.value.size.width * 0.4))),
                        child: Icon(
                          Icons.fast_forward,
                          size: 50,
                          color: Colors.white.withOpacity(0.5),
                        )),
                  ),
                ],
              ),
            ),
          ),
          Positioned(
            top: 5,
            right: 5,
            child: InkWell(
              onTap: () => Navigator.pop(context),
              child: Container(
                padding: const EdgeInsets.all(5),
                decoration: BoxDecoration(
                  color: Colors.red,
                  borderRadius: BorderRadius.circular(5),
                ),
                child: const Icon(Icons.close, color: Colors.black),
              ),
            ),
          )
        ],
      ),
    );
  }
}
