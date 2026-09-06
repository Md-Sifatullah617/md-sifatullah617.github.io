import 'package:drop_cap_text/drop_cap_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:md_sifatullah/design/utils/app_colors.dart';
import 'package:md_sifatullah/features/videos/models/videos_data_ui_model.dart';
import 'package:md_sifatullah/features/videos/ui/video_dialog.dart';
import 'package:url_launcher/url_launcher.dart';

class VideosDesktopWidget extends StatefulWidget {
  const VideosDesktopWidget({super.key});

  @override
  State<VideosDesktopWidget> createState() => _VideosDesktopWidgetState();
}

class _VideosDesktopWidgetState extends State<VideosDesktopWidget> {
  @override
  Widget build(BuildContext context) {
    return Container(
        margin: const EdgeInsets.only(bottom: 40),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const Text(
            'Latest Projects',
            style: TextStyle(fontSize: 40),
          ),
          const SizedBox(height: 40),
          RichText(
            text: TextSpan(
                style: TextStyle(
                    color: Colors.white,
                    height: 1.2,
                    fontFamily: 'Preah',
                    fontSize: MediaQuery.of(context).size.width / 44,
                    fontWeight: FontWeight.bold),
                children: const [
                  TextSpan(
                      text: ' N.B. ',
                      style: TextStyle(
                          backgroundColor: Colors.yellowAccent,
                          color: Colors.black)),
                  TextSpan(text: ' This website was developed using Flutter.')
                ]),
          ),
          const SizedBox(height: 20),
          MasonryGridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate:
                  const SliverSimpleGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2),
              crossAxisSpacing: 40,
              itemCount: projectsList.length,
              itemBuilder: (context, index) {
                return Container(
                    margin: const EdgeInsets.only(bottom: 40),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 40, vertical: 20),
                    decoration: BoxDecoration(
                        color: AppColors.purpleDark.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(20)),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(projectsList[index].title!,
                            style: const TextStyle(
                              fontSize: 30,
                              fontWeight: FontWeight.bold,
                            )),
                        const SizedBox(height: 10),
                        DropCapText(
                          projectsList[index].description!,
                          style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.w100,
                              fontFamily: GoogleFonts.poppins().fontFamily),
                          dropCapPadding: const EdgeInsets.all(10),
                          dropCap: DropCap(
                              width: 100,
                              height: 100,
                              child: Container(
                                decoration: BoxDecoration(
                                    color: AppColors.purpleDark,
                                    borderRadius: BorderRadius.circular(10),
                                    image: DecorationImage(
                                        image: AssetImage(
                                            projectsList[index].thumbnail!),
                                        fit: BoxFit.cover)),
                              )),
                        ),
                        const SizedBox(height: 20),
                        Wrap(
                            alignment: WrapAlignment.center,
                            spacing: 10,
                            runSpacing: 10,
                            children: [
                              if (projectsList[index].githubLink != '')
                                InkWell(
                                    onTap: () => launchUrl(Uri.parse(
                                        projectsList[index].githubLink!)),
                                    child: Container(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 20, vertical: 10),
                                        decoration: BoxDecoration(
                                            border: Border.all(
                                                color: Colors.white, width: 2),
                                            borderRadius:
                                                BorderRadius.circular(10)),
                                        child: FittedBox(
                                          child: const Row(
                                              mainAxisSize: MainAxisSize.min,
                                              children: [
                                                FaIcon(FontAwesomeIcons.github,
                                                    color: Colors.white),
                                                SizedBox(width: 10),
                                                Text('Github Link',
                                                    style: TextStyle(
                                                        color: Colors.white))
                                              ]),
                                        ))),
                              if (projectsList[index].livePreviewUrl != null &&
                                  projectsList[index].livePreviewUrl != '')
                                InkWell(
                                    onTap: () {
                                      launchUrl(
                                        Uri.parse(projectsList[index]
                                            .livePreviewUrl!),
                                        mode: LaunchMode.externalApplication,
                                      );
                                    },
                                    child: Container(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 20, vertical: 10),
                                        decoration: BoxDecoration(
                                            border: Border.all(
                                                color: Colors.white, width: 2),
                                            borderRadius:
                                                BorderRadius.circular(10)),
                                        child: FittedBox(
                                          child: const Row(
                                              mainAxisSize: MainAxisSize.min,
                                              children: [
                                                FaIcon(FontAwesomeIcons.desktop,
                                                    color: Colors.white),
                                                SizedBox(width: 10),
                                                Text('Live Preview',
                                                    style: TextStyle(
                                                        color: Colors.white))
                                              ]),
                                        ))),
                              if (projectsList[index].playStoreLink != '')
                                InkWell(
                                    onTap: () => launchUrl(Uri.parse(
                                        projectsList[index].playStoreLink!)),
                                    child: Container(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 20, vertical: 10),
                                        decoration: BoxDecoration(
                                            border: Border.all(
                                                color: Colors.white, width: 2),
                                            borderRadius:
                                                BorderRadius.circular(10)),
                                        child: FittedBox(
                                          child: const Row(
                                              mainAxisSize: MainAxisSize.min,
                                              children: [
                                                FaIcon(
                                                    FontAwesomeIcons.googlePlay,
                                                    color: Colors.white),
                                                SizedBox(width: 10),
                                                Text('Play Store Link',
                                                    style: TextStyle(
                                                        color: Colors.white))
                                              ]),
                                        ))),
                              if (projectsList[index].appStoreLink != null &&
                                  projectsList[index].appStoreLink != '')
                                InkWell(
                                    onTap: () => launchUrl(Uri.parse(
                                        projectsList[index].appStoreLink!)),
                                    child: Container(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 20, vertical: 10),
                                        decoration: BoxDecoration(
                                            border: Border.all(
                                                color: Colors.white, width: 2),
                                            borderRadius:
                                                BorderRadius.circular(10)),
                                        child: FittedBox(
                                          child: const Row(
                                              mainAxisSize: MainAxisSize.min,
                                              children: [
                                                FaIcon(FontAwesomeIcons.apple,
                                                    color: Colors.white),
                                                SizedBox(width: 10),
                                                Text('App Store Link',
                                                    style: TextStyle(
                                                        color: Colors.white))
                                              ]),
                                        ))),
                              if (projectsList[index].apkFile != '')
                                InkWell(
                                    onTap: () => launchUrl(Uri.parse(
                                        projectsList[index].apkFile!)),
                                    child: Container(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 20, vertical: 10),
                                        decoration: BoxDecoration(
                                            border: Border.all(
                                                color: Colors.white, width: 2),
                                            borderRadius:
                                                BorderRadius.circular(10)),
                                        child: const Row(
                                            mainAxisSize: MainAxisSize.min,
                                            children: [
                                              FaIcon(
                                                  FontAwesomeIcons.fileArrowDown,
                                                  color: Colors.white),
                                              SizedBox(width: 10),
                                              Text('Apk File',
                                                  style: TextStyle(
                                                      color: Colors.white))
                                            ]))),
                              if (projectsList[index].videoUrl != null &&
                                  projectsList[index].videoUrl != '')
                                InkWell(
                                    onTap: () {
                                      showDialog(
                                          context: context,
                                          builder: (context) => VideoDialog(
                                              url: projectsList[index]
                                                  .videoUrl!));
                                    },
                                    child: Container(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 20, vertical: 10),
                                        decoration: BoxDecoration(
                                            border: Border.all(
                                                color: Colors.white, width: 2),
                                            borderRadius:
                                                BorderRadius.circular(10)),
                                        child: FittedBox(
                                          child: const Row(
                                              mainAxisSize: MainAxisSize.min,
                                              children: [
                                                FaIcon(FontAwesomeIcons.video,
                                                    color: Colors.white),
                                                SizedBox(width: 10),
                                                Text('Watch Video',
                                                    style: TextStyle(
                                                        color: Colors.white))
                                              ]),
                                        ))),
                            ])
                      ],
                    ));
              })
        ]));
  }
}
