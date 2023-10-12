import 'package:flutter/material.dart';

class VideosMobileWidget extends StatefulWidget {
  const VideosMobileWidget({super.key});

  @override
  State<VideosMobileWidget> createState() => _VideosMobileWidgetState();
}

class _VideosMobileWidgetState extends State<VideosMobileWidget> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: const EdgeInsets.only(bottom: 40),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const Text(
            'Latest Videos',
            style: TextStyle(fontSize: 24),
          ),
          const SizedBox(height: 20),
        ]));
  }
}
