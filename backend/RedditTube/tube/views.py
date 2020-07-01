from django.shortcuts import render

# Create your views here.+
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
import urllib
from rest_framework.decorators import api_view
import praw;
import re;
import configparser;
import os

@api_view(['POST'])
def getUrls(request):
    if request.method == 'POST':

        thisfolder = os.path.dirname(os.path.abspath(__file__))
        configParser = configparser.ConfigParser()
        path = os.path.join(thisfolder, 'config.txt')
        configParser.read(path)
        print(configParser.sections())
        client_secret = configParser.get('config', 'client_secret')
        password = configParser.get('config', 'password')
        username = configParser.get('config', 'username');
        client_id = configParser.get('config', 'client_id')
        urlObj = JSONParser().parse(request);
        print(urlObj)
        subreddit = urlObj['subreddit'];
        type = urlObj['type'];
        time = urlObj['time']
        reddit = praw.Reddit(client_id=client_id,
         client_secret=client_secret, password=password,
         user_agent='RedditToPlaylist', username=username)
        subreddit = reddit.subreddit(subreddit);
        res = None;
        if type=='hot':
            res = subreddit.hot(limit=100);
        if type=='top':
            res = subreddit.top(time,limit=100);
        links=[];
        if res!=None:
            for submission in res:
                if submission.secure_media:
                    if 'oembed' in submission.secure_media:
                        print(re.search("(src=\")([\S]+)", submission.secure_media['oembed']['html'])[2][:-1])
                        try:
                            links.append(re.search("embed\/(\S[^?]+)", submission.secure_media['oembed']['html'])[1])
                        except:
                            print('Not possible')
                            continue;
            return JsonResponse(links,safe=False);
